import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PaginateParams } from 'src/common/params/paginate.params.dto';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { WorkerService } from 'src/config/worker/worker.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly workerService: WorkerService,
  ) {}

  async findAll(paginateParams: PaginateParams): Promise<OrderEntity[]> {
    return await this.prisma.order.findMany({
      skip: paginateParams.skip,
      take: paginateParams.take,
    });
  }
  async processOrder(order: CreateOrderDto) {
    const orderEntity = new OrderEntity();
    orderEntity.title = order.title;
    orderEntity.description = order.description;
    return await this.workerService.processOrder(orderEntity);
  }
}
