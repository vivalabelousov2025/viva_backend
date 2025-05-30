import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from 'generated/prisma';
import { StatusOkDto } from 'src/common/dto/success.dto';
import { AuthDto } from './dto/auth.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/users/entities/user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';

interface JwtPayload {
  email: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  login(loginDto: AuthDto): LoginResponseDto {
    const payload = { email: loginDto.email, sub: loginDto.password };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    };
  }

  async register(registerDto: AuthDto): Promise<StatusOkDto> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }
    await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
      },
    });

    return {
      status: 'OK',
    };
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<LoginResponseDto> {
    console.log(refreshTokenDto.refresh_token);
    if (!refreshTokenDto.refresh_token) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const decoded = await this.jwtService.verifyAsync<JwtPayload>(
      refreshTokenDto.refresh_token,
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      },
    );
    if (!decoded) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return this.login({
      email: decoded.email,
      password: decoded.sub,
    });
  }
}
