import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../modules/users/service';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-custom') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'yourSecretKey',
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    payload: JwtPayload,
  ): Promise<{ userId: number; email: string; permissions: string[] }> {
    const user = await this.userService.findOne(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }
    const authorizationHeader = request.headers['authorization'];
    const token = authorizationHeader?.split(' ')[1];
    const verifyToken = user[0].verify_token;
    if (token !== verifyToken) {
      throw new UnauthorizedException();
    }
    return {
      userId: user[0].id,
      email: user[0].email,
      permissions: user[0].permissions,
    };
  }
}
