import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { EmailService } from 'src/modules/email/email.service';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  PREFIX_OTP = 'OTP_';
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }
    return null;
  }

  jwtSign(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(
      password,
      this.configService.get('auth.bcrypt.saltOrRounds') as number,
    );
  }

  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  login(user: User) {
    return this.jwtSign(user);
  }

  async signup(dto: User) {
    if (dto.password) {
      dto.password = await this.hashPassword(dto.password);
    }
    const user = await this.usersService.create(dto);
    return this.jwtSign(user);
  }

  changePassword() {
    // TODO
  }

  async resetPassword(body: any) {
    const { otp, token, password } = body;
    let user = null;

    if (token) {
      const { sub: userId } = this.jwtService.verify(token);
      user = await this.usersService.findOneById(userId);
      if (!user) {
        throw new BadRequestException('Token is invalid');
      }
    } else if (otp) {
      const userId = await this.cacheManager.get(this.PREFIX_OTP + otp);
      if (!userId) {
        throw new BadRequestException('OTP is invalid');
      }
      await this.cacheManager.del(this.PREFIX_OTP + otp);
      user = await this.usersService.findOneById(userId as number);
      if (!user) {
        throw new BadRequestException('User not found');
      }
    }

    if (user) {
      this.usersService.update(user.id, { password });
    }
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const token = this.jwtService.sign(
        { sub: user.id },
        { expiresIn: '10m' },
      );

      const otp = this.generateOtp();
      await this.cacheManager.set(this.PREFIX_OTP + otp, user.id, 600);

      const mailOptions = this.emailService.forgotPasswordTemplate(
        user.email,
        token,
        otp,
      );
      this.emailService.sendMail(mailOptions);
    } else {
      throw new BadRequestException('Email not found');
    }
  }

  generateOtp(): number {
    // otp have 6 ditgit
    return Math.floor(100000 + Math.random() * 900000);
  }

  async google(user: User) {
    if (!(await this.usersService.findOneByEmail(user.email))) {
      return this.signup(user);
    }
    return this.login(user);
  }

  async facebook(user: User) {
    if (!(await this.usersService.findOneByEmail(user.email))) {
      return this.signup(user);
    }
    return this.login(user);
  }
}
