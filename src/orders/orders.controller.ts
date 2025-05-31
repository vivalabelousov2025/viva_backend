import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PaginateParams } from 'src/common/params/paginate.params.dto';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilterParams } from 'src/common/params/filter.params.dto';
import { SortParams } from 'src/common/params/order.params.dto';
import { OrderParams } from './params/order.params.dto';
import { OrderActionEntity } from './entities/order-action.entity';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Bearer')
  @ApiOperation({ summary: 'Get all orders' })
  async findAll(
    @Query() paginateParams: PaginateParams,
    @Query() filterParams: FilterParams,
    @Query() sortParams: SortParams,
    @Query() orderParams: OrderParams,
    @CurrentUser() user: UserEntity,
  ): Promise<OrderEntity[]> {
    return await this.ordersService.findAll(
      paginateParams,
      filterParams,
      sortParams,
      orderParams,
      user.user_id,
    );
  }

  @Get('orders/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Bearer')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiResponse({
    status: 200,
    description: 'Order found',
    type: OrderEntity,
  })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ): Promise<OrderEntity | null> {
    return await this.ordersService.findOne(id, user.user_id);
  }

  @Post('orders')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Bearer')
  @ApiOperation({ summary: 'Create order' })
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.ordersService.createOrder(createOrderDto, user.user_id);
  }

  @Get('orders-actions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Bearer')
  @ApiOperation({ summary: 'Find actions on order' })
  async findActions(): Promise<OrderActionEntity[]> {
    return await this.ordersService.findActions();
  }
}
