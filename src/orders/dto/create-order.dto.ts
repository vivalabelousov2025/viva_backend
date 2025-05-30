import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The title of the order',
    example: 'Order 1',
  })
  title: string;
  @ApiProperty({
    description: 'The description of the order',
    example: 'Order 1 description',
  })
  description: string;
}
