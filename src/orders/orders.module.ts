import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaClient } from 'generated/prisma';
import { WorkerModule } from 'src/config/worker/worker.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => WorkerModule), UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaClient],
  exports: [OrdersService],
})
export class OrdersModule {}
