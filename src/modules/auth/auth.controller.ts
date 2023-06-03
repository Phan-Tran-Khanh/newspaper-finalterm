import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';
import { User } from 'src/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.authService.login(req.user as User);
    res.cookie('jwt', accessToken, { httpOnly: true, path: '/' });
    res.redirect('/');
  }

  @Post('signup')
  async signup(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const { accessToken } = await this.authService.signup(createUserDto);
    res.cookie('jwt', accessToken, { httpOnly: true, path: '/' });
    res.redirect('/');
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: { email: string | undefined }) {
    if (!body.email) {
      throw new NotFoundException('Email is required');
    }
    this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  resetPassword(@Body() body: { otp: string; password: string }) {
    // const { otp, password } = body;
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
