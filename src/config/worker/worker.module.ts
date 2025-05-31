import { forwardRef, Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { HttpModule } from '@nestjs/axios';
import { WorkerController } from './worker.controller';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [HttpModule, forwardRef(() => OrdersModule)],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
