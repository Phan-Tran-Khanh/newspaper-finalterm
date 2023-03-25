import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginDto): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(
      loginUserDto.username,
    );
    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      return user;
    }
    return null;
  }

  jwtSign(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) return "Invalid username or password";
    return this.jwtSign(user);
  }

  async loginWithGoogle(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create(createUserDto);
    return this.jwtSign(user);
  }

  changePassword() {
    // TODO
  }

  forgotPassword() {
    // TODO
  }
}
