import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ProcessOrderDto } from 'src/orders/dto/process-order.dto';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';

@Injectable()
export class WorkerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async processOrder(order: CreateOrderDto): Promise<ProcessOrderDto> {
    const response = await firstValueFrom(
      this.httpService.post<ProcessOrderDto>(
        this.configService.get('WORKER_URL') + '/order-process',
        {
          ...order,
        },
      ),
    );
    return response.data;
  }
}
