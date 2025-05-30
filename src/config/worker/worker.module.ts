import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { HttpModule } from '@nestjs/axios';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports: [HttpModule, TeamsModule],
  controllers: [],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
