import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/enum/UserRole.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from './roles.decorator';

export function Protected(...roles: UserRole[]) {
  return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard));
}
