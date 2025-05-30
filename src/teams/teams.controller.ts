import { Controller, Get, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { PaginateParams } from 'src/common/params/paginate.params.dto';
import { TeamWorkerEntity } from './entities/team-worker.entity';
import { ApiOperation } from '@nestjs/swagger';
import { TeamEntity } from './entities/team.entity';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all teams' })
  findAll(@Query() paginateParams: PaginateParams): Promise<TeamEntity[]> {
    return this.teamsService.findAll(paginateParams);
  }

  @Get('by-worker')
  @ApiOperation({ summary: 'Get teams by worker' })
  async findByWorker(): Promise<TeamWorkerEntity[]> {
    return await this.teamsService.findByWorker();
  }
}
