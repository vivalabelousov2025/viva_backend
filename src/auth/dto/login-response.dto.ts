import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Access token',
    example: 'access_token',
  })
  access_token: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'refresh_token',
  })
  refresh_token: string;
}
