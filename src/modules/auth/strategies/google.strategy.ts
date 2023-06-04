import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    console.log(configService.get('auth.google'));
    super(configService.get('auth.google'));
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    callback: VerifyCallback,
  ) {
    const { emails, name } = profile;
    if (!emails?.length || !name) {
      return callback(new Error('Invalid Google profile'));
    }
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    callback(null, user);
  }
}
