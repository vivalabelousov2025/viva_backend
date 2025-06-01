import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { StatusOkDto } from 'src/common/dto/success.dto';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { ProcessOrderDto } from 'src/orders/dto/process-order.dto';
import { RejectOrderDto } from 'src/orders/dto/reject-order.dto';
import { OrdersService } from 'src/orders/orders.service';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly workerService: WorkerService,
  ) {}

  @Post('order-process')
  @ApiOperation({ summary: 'Process order' })
  async orderProcess(@Body() processOrderDto: ProcessOrderDto) {
    console.log(processOrderDto);
    return await this.ordersService.processOrder(processOrderDto);
  }
  @Post('orders-reject')
  @ApiOperation({ summary: 'Reject order' })
  async rejectOrder(
    @Body() rejectOrderDto: RejectOrderDto,
  ): Promise<StatusOkDto> {
    return await this.ordersService.rejectOrder(rejectOrderDto);
  }

  @Post('test-process')
  @ApiOperation({ summary: 'Test process' })
  async testProcess(@Body() createOrderDto: CreateOrderDto) {
    return await this.workerService.processOrder(createOrderDto);
  }
}
