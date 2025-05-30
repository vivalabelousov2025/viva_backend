import { ApiProperty } from '@nestjs/swagger';
import { Order, OrderStatus } from 'generated/prisma';

export class OrderEntity implements Order {
  @ApiProperty({
    description: 'The ID of the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  order_id: string;
  @ApiProperty({
    description: 'The ID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  user_id: string;
  @ApiProperty({
    description: 'The ID of the team',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  team_id: string | null;
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
  @ApiProperty({
    description: 'The created at date of the order',
    example: '2021-01-01',
  })
  created_at: Date;
  @ApiProperty({
    description: 'The updated at date of the order',
    example: '2021-01-01',
  })
  updated_at: Date;
  @ApiProperty({
    description: 'The estimated end date of the order',
    example: '2021-01-01',
    type: Date,
  })
  estimated_end_date: Date | null;
  @ApiProperty({
    description: 'The estimated start date of the order',
    example: '2021-01-01',
    type: Date,
  })
  estimated_start_date: Date | null;
  @ApiProperty({
    description: 'The status of the order',
    example: 'PENDING',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
  @ApiProperty({
    description: 'The total price of the order',
    example: 100,
    type: Number,
  })
  total_price: number | null;
}
