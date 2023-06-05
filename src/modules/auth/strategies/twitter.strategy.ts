import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private readonly configService: ConfigService) {
    super(configService.get('auth.twitter'));
  }
  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    callback: any,
  ) {
    const { emails, name } = profile;
    if (!emails?.length || !name) {
      return callback(new Error('Invalid Twitter profile'));
    }
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    callback(null, user);
  }
}
