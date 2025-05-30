import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'refresh_token',
    description: 'Refresh token',
  })
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
