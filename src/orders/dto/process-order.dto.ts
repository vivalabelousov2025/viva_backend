import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ProcessOrderDto {
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  @IsString()
  team_id: string;

  @IsNotEmpty()
  @IsNumber()
  total_price: number;

  @IsNotEmpty()
  @IsDateString()
  estimated_start_date: string;

  @IsNotEmpty()
  @IsDateString()
  estimated_end_date: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  order_technologies: string[];
}
