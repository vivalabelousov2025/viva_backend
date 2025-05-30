import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaClient } from 'generated/prisma';
import { WorkerModule } from 'src/config/worker/worker.module';

@Module({
  imports: [WorkerModule],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaClient],
})
export class OrdersModule {}
