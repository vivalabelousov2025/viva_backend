import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { TechnologyEntity } from './entities/technology.entity';
import { seedTechnologies } from './seed/technologies.seed';

@Injectable()
export class TechnologiesService {
  constructor(private readonly prisma: PrismaClient) {}

  async onModuleInit() {
    const technologies = await this.prisma.technology.findMany();
    if (technologies.length === 0) {
      await seedTechnologies(this.prisma);
    }
  }

  async findAll(): Promise<TechnologyEntity[]> {
    const technologies = await this.prisma.technology.findMany();
    return technologies;
  }
}
