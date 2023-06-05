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
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';
import { User } from 'src/entity/user.entity';
import { FacebookAuthGuard } from 'src/guards/facebook-auth.guard';
import { TwitterAuthGuard } from 'src/guards/twitter-auth.guard';

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
  async signup(@Res() res: Response, @Body() dto: User) {
    const { accessToken } = await this.authService.signup(dto);
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

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt', { path: '/' });
    res.redirect('/');
  }

  @Post('reset-password')
  resetPassword(
    @Body() body: { token: string; otp: string; password: string },
  ) {
    // const { token, otp, password } = body;
    this.authService.resetPassword(body);
  }

  @Get('refresh-token')
  refreshToken() {
    // TODO
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  google() {
    // NOTE: This route is never called because the GoogleAuthGuard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = await this.authService.google(req.user as User);
    res.cookie('jwt', accessToken, { httpOnly: true, path: '/' });
    res.redirect('/');
  }

  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  facebook() {
    // NOTE: This route is never called because the FacebookAuthGuard redirects to Facebook
  }

  @Get('facebook/callback')
  @UseGuards(FacebookAuthGuard)
  async facebookCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = await this.authService.facebook(req.user as User);
    res.cookie('jwt', accessToken, { httpOnly: true, path: '/' });
    res.redirect('/');
  }

  @Get('twitter')
  @UseGuards(FacebookAuthGuard)
  twitter() {
    // NOTE: This route is never called because the FacebookAuthGuard redirects to Facebook
  }

  @Get('twitter/callback')
  @UseGuards(TwitterAuthGuard)
  async twitterCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = await this.authService.facebook(req.user as User);
    res.cookie('jwt', accessToken, { httpOnly: true, path: '/' });
    res.redirect('/');
  }
}
