import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginateParams } from 'src/common/params/paginate.params.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll(@Query() paginateParams: PaginateParams): Promise<UserEntity[]> {
    return this.usersService.findAll(paginateParams);
  }
}
