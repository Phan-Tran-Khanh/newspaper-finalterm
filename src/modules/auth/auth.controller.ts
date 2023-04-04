import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: any) {
    this.authService.forgotPassword(body);
  }

  @Get('reset-password')
  resetPassword() {
    // TODO
  }

  @Post('reset-password')
  resetPasswordHandler(@Body() body: any) {
    this.authService.resetPassword(body);
  }

  @Get('refresh-token')
  refresh() {
    // TODO
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    // TODO
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect() {
    // TODO
  }
}
