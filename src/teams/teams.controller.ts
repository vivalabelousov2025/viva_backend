import { Controller, Get, Param, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { PaginateParams } from 'src/common/params/paginate.params.dto';
import { TeamWorkerEntity } from './entities/team-worker.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeamEntity } from './entities/team.entity';
import { FilterParams } from 'src/common/params/filter.params.dto';
import { SortParams } from 'src/common/params/order.params.dto';

@Controller('')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get('teams')
  @ApiOperation({ summary: 'Get all teams' })
  findAll(
    @Query() paginateParams: PaginateParams,
    @Query() filterParams: FilterParams,
    @Query() sortParams: SortParams,
  ): Promise<TeamEntity[]> {
    return this.teamsService.findAll(paginateParams, filterParams, sortParams);
  }
  @Get('teams/:id')
  @ApiResponse({
    status: 200,
    description: 'Team found',
    type: TeamEntity,
  })
  @ApiOperation({ summary: 'Get team by id' })
  async findOne(@Param('id') id: string): Promise<TeamEntity | null> {
    return await this.teamsService.findOne(id);
  }

  @Get('teams-by-worker')
  @ApiOperation({ summary: 'Ge teams by worker' })
  async findByWorker(): Promise<TeamWorkerEntity[]> {
    console.log('findByWorker');
    return await this.teamsService.findByWorker();
  }
}
