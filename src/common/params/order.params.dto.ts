import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SortParams {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The sort field',
  })
  sort?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    enum: ['asc', 'desc'],
  })
  order?: string;
}
