import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { EmailService } from 'src/modules/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  jwtSign(user: User) {
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  login(user: User) {
    return this.jwtSign(user);
  }

  async signup(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create(createUserDto);
    return this.jwtSign(user);
  }

  changePassword() {
    // TODO
  }

  sendResetPasswordEmail(user: User) {
    const token = this.jwtService.sign({
      sub: user.id,
      username: user.username,
      roles: user.roles,
    });
    const url = `http://localhost:3000/reset-password/${token}`;
    this.emailService.sendMail({
      to: user.email,
      subject: 'Reset your password',
      text: `Click the link to reset your password: ${url}`,
      html: `<p>Click the link to reset your password: <a href="${url}">${url}</a></p>`,
    });
  }

  async forgotPassword(body: { email?: string; username?: string }) {
    const { email, username } = body;
    let user: User | null = null;
    if (email) {
      user = await this.usersService.findOneByEmail(email);
    } else if (username) {
      user = await this.usersService.findOneByUsername(username);
    }
    if (user) {
      console.log(user);
      this.sendResetPasswordEmail(user);
    }
  }
}
