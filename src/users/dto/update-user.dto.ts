import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Email',
    example: 'test@test.com',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  @IsOptional()
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  last_name: string;
}
