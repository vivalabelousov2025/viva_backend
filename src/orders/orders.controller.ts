import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PaginateParams } from 'src/common/params/paginate.params.dto';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { WorkerService } from 'src/config/worker/worker.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly workerService: WorkerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  async findAll(
    @Query() paginateParams: PaginateParams,
  ): Promise<OrderEntity[]> {
    return await this.ordersService.findAll(paginateParams);
  }

  @Post('process')
  @ApiOperation({ summary: 'Process order' })
  async processOrder(@Body() order: CreateOrderDto) {
    return await this.ordersService.processOrder(order);
  }
}
