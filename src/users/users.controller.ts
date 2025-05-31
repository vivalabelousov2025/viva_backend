import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginateParams } from 'src/common/params/paginate.params.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(
    @Query() paginateParams: PaginateParams,
  ): Promise<UserEntity[]> {
    return await this.usersService.findAll(paginateParams);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Bearer')
  @ApiOperation({ summary: 'Get user' })
  async getMe(@CurrentUser() user: UserEntity) {
    return await this.usersService.getMe(user.user_id);
  }

  @Patch('/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Bearer')
  @ApiOperation({ summary: 'Update user' })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.usersService.updateMe(updateUserDto, user.user_id);
  }
}
