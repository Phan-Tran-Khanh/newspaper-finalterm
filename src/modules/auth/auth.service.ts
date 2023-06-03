import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { EmailService } from 'src/modules/email/email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
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

  async hashPassword(password: string) {
    return await bcrypt.hash(
      password,
      parseInt(this.configService.get('BCRYPT_SALT') as string, 10),
    );
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  login(user: User) {
    return this.jwtSign(user);
  }

  async signup(dto: User) {
    dto.password = await this.hashPassword(dto.password);
    const user = await this.usersService.create(dto);
    return this.jwtSign(user);
  }

  changePassword() {
    // TODO
  }

  async resetPassword(body: any) {
    const { token, password } = body;
    const { sub: userId } = this.jwtService.verify(token);
    const user = await this.usersService.findOneById(userId);
    if (user) {
      this.usersService.update(userId, { password });
    } else {
      throw new ForbiddenException();
    }
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const token = this.jwtService.sign(
        { sub: user.id },
        { expiresIn: '10m' },
      );
      const mailOptions = this.emailService.forgotPasswordTemplate(
        user.email,
        token,
      );
      this.emailService.sendMail(mailOptions);
    } else {
      throw new BadRequestException('Email not found');
    }
  }
}
