import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: ConfigService) {
    super(configService.get('auth.facebook'));
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
      return callback(new Error('Invalid Facebook profile'));
    }
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    callback(null, user);
  }
}
