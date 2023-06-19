import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    console.log('profile', profile);
    const { emails, displayName } = profile;
    if (!emails?.length) {
      return callback(new NotFoundException('Invalid Facebook profile'));
    }
    const user = {
      email: emails[0].value,
      firstName: displayName,
      lastName: displayName,
    };
    callback(null, user);
  }
}
