import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { UserEntity } from './entities/user.entity';
import { PaginateParams } from 'src/common/params/paginate.params.dto';
import { seedUsers } from './seed/users.seed';
import { seedOrders } from 'src/orders/seed/orders.seed';
import { seedTeams } from 'src/teams/seed/teams.seed';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async onModuleInit() {
    const users = await this.prisma.user.findMany();
    if (users.length === 0) {
      await seedUsers();
    }
    const teams = await this.prisma.team.findMany();
    if (teams.length === 0) {
      await seedTeams();
    }
    const orders = await this.prisma.order.findMany();
    if (orders.length === 0) {
      await seedOrders();
    }
  }
  async findAll(paginateParams: PaginateParams): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({
      skip: paginateParams.skip,
      take: paginateParams.take,
    });
  }
}
