import { Injectable } from '@nestjs/common';
import { TeamEntity } from './entities/team.entity';
import { PaginateParams } from 'src/common/params/paginate.params.dto';
import { PrismaClient } from 'generated/prisma';
import { TeamWorkerEntity } from './entities/team-worker.entity';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(paginateParams: PaginateParams): Promise<TeamEntity[]> {
    const { skip, take } = paginateParams;
    return await this.prisma.team.findMany({
      skip,
      take,
      include: {
        orders: true,
      },
    });
  }

  async findByWorker(): Promise<TeamWorkerEntity[]> {
    const teams = await this.prisma.team.findMany({
      include: {
        orders: true,
      },
    });
    return teams.map((team) => {
      const nextFreeDate = team.orders.reduce((acc, order) => {
        return acc > order.estimated_end_date! ? acc : order.estimated_end_date;
      }, new Date());
      return {
        team_id: team.team_id,
        current_orders: team.orders.length,
        next_free_date: nextFreeDate,
        experience: team.experience,
        members_count: team.members_count,
      };
    });
  }
}
