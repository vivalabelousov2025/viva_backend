import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PrismaClient } from 'generated/prisma';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, PrismaClient],
})
export class TeamsModule {}
