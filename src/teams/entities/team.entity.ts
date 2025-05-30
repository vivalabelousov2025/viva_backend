import { ApiProperty } from '@nestjs/swagger';
import { Team } from 'generated/prisma';
import { OrderEntity } from 'src/orders/entities/order.entity';

export class TeamEntity implements Team {
  @ApiProperty({
    description: 'The ID of the team',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  team_id: string;
  @ApiProperty({
    description: 'The name of the team',
    example: 'Team 1',
  })
  name: string;
  @ApiProperty({
    description: 'The created at date of the team',
    example: '2021-01-01',
  })
  created_at: Date;
  @ApiProperty({
    description: 'The updated at date of the team',
    example: '2021-01-01',
  })
  updated_at: Date;
  @ApiProperty({
    description: 'The members count of the team',
    example: 1,
  })
  members_count: number;
  @ApiProperty({
    description: 'The experience of the team',
    example: 1,
  })
  experience: number;
  @ApiProperty({
    description: 'The orders of the team',
    example: [],
    type: [OrderEntity],
  })
  orders: OrderEntity[];
}
