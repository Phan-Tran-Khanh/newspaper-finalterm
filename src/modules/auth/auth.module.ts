import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import authConfig from 'src/config/auth.config';
import { UserModule } from 'src/modules/user/user.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync(authConfig.asProvider()),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    EmailService,
    JwtService,
  ],
  exports: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
