import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PaginateParams {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    description: 'The number of items to skip',
  })
  skip?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    description: 'The number of items to take',
  })
  take?: number;
}
