import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  jwtSign(user: User) {
    const payload = { sub: user.id, username: user.username, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  login(user: User) {
    return this.jwtSign(user);
  }

  async loginWithGoogle() {
    // TODO
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
