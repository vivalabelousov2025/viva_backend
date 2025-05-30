import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { OrderEntity } from 'src/orders/entities/order.entity';

@Injectable()
export class WorkerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async processOrder(order: OrderEntity) {
    const response = await this.httpService
      .post(this.configService.get('WORKER_URL') + '/order-process', order)
      .toPromise();
    console.log(response);
  }
}
