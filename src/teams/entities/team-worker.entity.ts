import { ApiProperty } from '@nestjs/swagger';

export class TeamWorkerEntity {
  @ApiProperty({
    description: 'The ID of the team',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  team_id: string;
  @ApiProperty({
    description: 'The current number of orders in the team',
    example: 1,
  })
  current_orders: number;
  @ApiProperty({
    description: 'The next free date of the team',
    example: '2021-01-01',
    type: String,
  })
  next_free_date: string;

  @ApiProperty({
    description: 'The experience of the team',
    example: 1,
  })
  experience: number;

  @ApiProperty({
    description: 'The members count of the team',
    example: 1,
  })
  members_count: number;
}
