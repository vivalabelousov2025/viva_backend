import { IsNotEmpty, IsUUID } from 'class-validator';

export class ChangeTeamDto {
  @IsNotEmpty()
  @IsUUID()
  order_id: string;

  @IsNotEmpty()
  @IsUUID()
  team_id: string;
}
