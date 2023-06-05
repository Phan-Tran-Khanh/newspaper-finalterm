import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('auth', () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60d' },
  } as JwtModuleOptions,
  bcrypt: {
    saltOrRounds: parseInt(process.env.BCRYPT_SALT_OR_ROUND || '10', 10),
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
    scope: ['email', 'profile'],
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    passReqToCallback: true,
    scope: ['email', 'public_profile'],
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
    passReqToCallback: true,
    scope: ['email', 'public_profile'],
  },
}));
