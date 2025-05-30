import { ApiProperty } from '@nestjs/swagger';
import { User } from 'generated/prisma';

export class UserEntity implements User {
  @ApiProperty({
    description: 'The ID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  user_id: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'test@test.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
    type: String,
  })
  password: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    type: String,
  })
  first_name: string | null;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    type: String,
  })
  last_name: string | null;

  @ApiProperty({
    description: 'Whether the user is an admin',
    example: false,
    type: Boolean,
  })
  is_admin: boolean;

  @ApiProperty({
    description: 'The created at date of the user',
    example: '2021-01-01',
    type: Date,
    format: 'date-time',
  })
  created_at: Date;

  @ApiProperty({
    description: 'The updated at date of the user',
    example: '2021-01-01',
    type: Date,
    format: 'date-time',
  })
  updated_at: Date;
}
