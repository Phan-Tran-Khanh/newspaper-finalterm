import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super(configService.get('auth.google'));
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    callback: VerifyCallback,
  ) {
    const { emails, name, username } = profile;
    if (!emails?.length || !name) {
      return callback(new Error('Invalid Google profile'));
    }
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      username: username,
      accessToken,
    };
    
    console.log('GoogleStrategy.validate() user:', user);

    // const jwt = await this.authService.validateOAuthLogin(user);
    callback(null, user);
  }
}
