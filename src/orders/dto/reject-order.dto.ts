import { IsNotEmpty, IsString } from 'class-validator';

export class RejectOrderDto {
  @IsNotEmpty()
  @IsString()
  order_id: string;
}
