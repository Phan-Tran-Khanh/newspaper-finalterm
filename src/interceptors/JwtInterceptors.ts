import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(UserService) private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request?.cookies?.jwt;

    if (token) {
      try {
        const payload = this.jwtService.verify(token, {
          secret: this.configService.get('JWT_SECRET'),
        });
        request.user = await this.userService.findOneById(payload.sub);
      } catch (err) {
        Logger.error(err);
      }
    }

    return next.handle();
  }
}
