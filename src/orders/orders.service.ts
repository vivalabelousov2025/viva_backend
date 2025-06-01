import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PaginateParams } from 'src/common/params/paginate.params.dto';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { WorkerService } from 'src/config/worker/worker.service';
import { RejectOrderDto } from './dto/reject-order.dto';
import { ProcessOrderDto } from './dto/process-order.dto';
import { StatusOkDto } from 'src/common/dto/success.dto';
import { FilterParams } from 'src/common/params/filter.params.dto';
import { SortParams } from 'src/common/params/order.params.dto';
import { UsersService } from 'src/users/users.service';
import { OrderParams } from './params/order.params.dto';
import { OrderActionEntity } from './entities/order-action.entity';
import { ChangeTeamDto } from './dto/change-team.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly workerService: WorkerService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(
    paginateParams: PaginateParams,
    filterParams: FilterParams,
    sortParams: SortParams,
    orderParams: OrderParams,
    userId: string,
  ): Promise<OrderEntity[]> {
    const where = {};
    const isAdmin = await this.usersService.isAdmin(userId);
    const orderBy = {};
    if (filterParams.field && filterParams.search) {
      where[filterParams.field] = {
        contains: filterParams.search,
      };
    }
    if (sortParams.sort) {
      orderBy[sortParams.sort] = sortParams.order === 'asc' ? 'asc' : 'desc';
    }
    if (!isAdmin) {
      where['user_id'] = userId;
    }
    if (orderParams.status) {
      where['status'] = orderParams.status;
    }

    return await this.prisma.order.findMany({
      skip: paginateParams.skip,
      take: paginateParams.take,
      where,
      orderBy,
      include: {
        user: true,
        team: true,
      },
    });
  }
  async findOne(id: string, userId: string): Promise<OrderEntity | null> {
    const isAdmin = await this.usersService.isAdmin(userId);

    const order = await this.prisma.order.findUnique({
      where: { order_id: id },
      include: {
        user: true,
        team: true,
      },
    });
    if (!isAdmin) {
      if (order?.user_id !== userId) {
        throw new ForbiddenException(
          'You are not allowed to access this order',
        );
      }
    }
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: string,
  ): Promise<StatusOkDto> {
    const order = await this.prisma.order.create({
      data: {
        title: createOrderDto.title,
        description: createOrderDto.description,
        user_id: userId,
      },
    });
    await this.workerService.processOrder(order);
    return new StatusOkDto();
  }

  async rejectOrder(rejectOrderDto: RejectOrderDto): Promise<StatusOkDto> {
    const order = await this.prisma.order.findUnique({
      where: { order_id: rejectOrderDto.order_id },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.status === 'REJECTED') {
      throw new BadRequestException('Order is already rejected');
    }
    await this.prisma.order.update({
      where: { order_id: rejectOrderDto.order_id },
      data: { status: 'REJECTED' },
    });
    return new StatusOkDto();
  }

  async changeTeam(changeTeamDto: ChangeTeamDto) {
    const order = await this.prisma.order.findUnique({
      where: { order_id: changeTeamDto.order_id },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.status !== 'IN_PROGRESS') {
      throw new BadRequestException('Order is not in progress');
    }
    const team = await this.prisma.team.findUnique({
      where: { team_id: changeTeamDto.team_id },
    });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    await this.prisma.order.update({
      where: { order_id: changeTeamDto.order_id },
      data: { team_id: changeTeamDto.team_id },
    });
    return new StatusOkDto();
  }

  async processOrder(processOrderDto: ProcessOrderDto) {
    console.log(processOrderDto);
    const order = await this.prisma.order.findUnique({
      where: { order_id: processOrderDto.order_id },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.status !== 'PENDING') {
      throw new BadRequestException('Order is already processed');
    }
    return await this.prisma.$transaction(async (tx) => {
      const estimatedStartDate = new Date(processOrderDto.estimated_start_date);
      const estimatedEndDate = new Date(processOrderDto.estimated_end_date);

      await tx.order.update({
        where: { order_id: processOrderDto.order_id },
        data: {
          team_id: processOrderDto.team_id,
          total_price: processOrderDto.total_price,
          estimated_start_date: estimatedStartDate,
          estimated_end_date: estimatedEndDate,
          status: 'IN_PROGRESS',
        },
      });

      await tx.orderTechnology.createMany({
        data: processOrderDto.order_technologies.map((id) => ({
          order_id: processOrderDto.order_id,
          technology_id: id,
        })),
      });

      return await tx.order.findUnique({
        where: { order_id: processOrderDto.order_id },
        include: {
          order_technologies: {
            include: {
              technology: true,
            },
          },
          team: true,
        },
      });
    });
  }

  async findActions(): Promise<OrderActionEntity[]> {
    const orders = await this.prisma.order.findMany({
      take: 5,
      select: {
        order_id: true,
        title: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });
    return orders;
  }
}
