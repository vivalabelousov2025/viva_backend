import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterParams {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The field to search in',
  })
  field?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The search query',
  })
  search?: string;
}
