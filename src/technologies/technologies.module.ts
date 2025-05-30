import { Module } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { PrismaClient } from 'generated/prisma';

@Module({
  controllers: [TechnologiesController],
  providers: [TechnologiesService, PrismaClient],
})
export class TechnologiesModule {}
