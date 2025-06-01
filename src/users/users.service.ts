import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { UserEntity } from './entities/user.entity';
import { PaginateParams } from 'src/common/params/paginate.params.dto';
import { seedUsers } from './seed/users.seed';
import { seedTeams } from 'src/teams/seed/teams.seed';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async onModuleInit() {
    const users = await this.prisma.user.findMany();
    if (users.length === 0) {
      await seedUsers();
    }
    const teams = await this.prisma.team.findMany();
    if (teams.length === 0) {
      await seedTeams();
    }
  }
  async findAll(paginateParams: PaginateParams): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({
      skip: paginateParams.skip,
      take: paginateParams.take,
    });
  }

  async updateMe(updateUserDto: UpdateUserDto, userId: string) {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }
    return await this.prisma.user.update({
      where: { user_id: userId },
      data: updateUserDto,
    });
  }
  async getMe(userId: string) {
    return await this.prisma.user.findUnique({
      where: { user_id: userId },
    });
  }
  async isAdmin(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });
    return user?.is_admin;
  }
}
