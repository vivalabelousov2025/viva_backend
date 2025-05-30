import { ApiProperty } from '@nestjs/swagger';

export class StatusOkDto {
  @ApiProperty({
    description: 'Status of the request',
    example: 'OK',
  })
  status: string = 'OK';
}
