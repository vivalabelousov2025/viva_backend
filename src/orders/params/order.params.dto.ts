import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from 'generated/prisma/client';

export class OrderParams {
  @ApiProperty({
    description: 'The status of the order',
    example: OrderStatus.PENDING,
    enum: OrderStatus,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
