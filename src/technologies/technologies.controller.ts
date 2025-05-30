import { Controller, Get } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologyEntity } from './entities/technology.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all technologies' })
  async findAll(): Promise<TechnologyEntity[]> {
    return await this.technologiesService.findAll();
  }
}
