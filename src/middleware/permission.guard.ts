import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );

    // Nếu không có permission yêu cầu thì không cần kiểm tra quyền
    if (!requiredPermission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // user đã được xác thực trong JwtAuthGuard
    // Kiểm tra xem user có quyền trong mảng permissions không
    if (user && user.permissions && Array.isArray(user.permissions)) {
      if (user.permissions.includes(requiredPermission)) {
        return true;
      }
    }

    throw new ForbiddenException(
      'You do not have permission to access this resource',
    );
  }
}
