import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The title of the order',
    example: 'Order 1',
  })
  @IsString()
  title: string;
  @ApiProperty({
    description: 'The description of the order',
    example: 'Order 1 description',
  })
  @IsString()
  description: string;
}
