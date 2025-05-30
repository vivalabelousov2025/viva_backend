import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { TeamsModule } from './teams/teams.module';
import { TechnologiesModule } from './technologies/technologies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    TeamsModule,
    OrdersModule,
    TechnologiesModule,
  ],
})
export class AppModule {}
