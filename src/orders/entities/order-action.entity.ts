import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'generated/prisma/client';

export class OrderActionEntity {
  @ApiProperty({
    description: 'The ID of the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  order_id: string;
  @ApiProperty({
    description: 'The title of the order',
    example: 'Order 1',
  })
  title: string;
  @ApiProperty({
    description: 'The status of the order',
    example: OrderStatus.PENDING,
    enum: OrderStatus,
  })
  status: OrderStatus;
  @ApiProperty({
    description: 'The created at date of the order',
    example: new Date(),
  })
  created_at: Date;
  @ApiProperty({
    description: 'The updated at date of the order',
    example: new Date(),
  })
  updated_at: Date;
}
