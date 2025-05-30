import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthDto } from '../dto/auth.dto';

type JwtErrorInfo = {
  name?: string;
  message?: string;
};

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = AuthDto>(
    err: any,
    user: TUser,
    info: JwtErrorInfo,
  ): TUser {
    if (err || !user) {
      if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      } else if (info?.message === 'No auth token') {
        throw new UnauthorizedException('Token not provided');
      }
      throw new UnauthorizedException('Invalid login or password');
    }
    return user;
  }
}
