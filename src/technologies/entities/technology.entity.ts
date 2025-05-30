import { ApiProperty } from '@nestjs/swagger';
import { Technology } from 'generated/prisma';

export class TechnologyEntity implements Technology {
  @ApiProperty({
    description: 'The ID of the technology',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  technology_id: string;

  @ApiProperty({
    description: 'The title of the technology',
    example: 'React',
  })
  title: string;
}
