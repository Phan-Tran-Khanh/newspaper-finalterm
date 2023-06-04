import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = registerAs(
  'auth.jwt',
  () =>
    ({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    } as JwtModuleOptions),
);

export const googleConfig = registerAs('auth.google', () => ({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
  scope: ['email', 'profile'],
}));

export const bcryptConfig = registerAs('auth.bcrypt', () => ({
  saltOrRound: process.env.BCRYPT_SALT || 10,
}));
