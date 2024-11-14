import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'

import { CreateUserDto } from '../application/dtos/create-user.dto'
import { FindUserByIdDto } from '../application/dtos/find-user-by-id.dto'
import { SearchUsersQueryDto } from '../application/dtos/search-param.dto'
import { UpdateUserDto } from '../application/dtos/update-user.dto'
import { InjectionToken } from '../application/injection-token'
import { UserServicePort } from '../domain/user.service.port'

@Controller('users')
export class UsersController {
  constructor(
    @Inject(InjectionToken.USER_SERVICE) private readonly usersService: UserServicePort,
  ) {}

  @Get('search')
  @HttpCode(HttpStatus.OK)
  async search(@Query() query: SearchUsersQueryDto) {
    return this.usersService.search(query)
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.usersService.findAll()
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(@Param() param: FindUserByIdDto) {
    return this.usersService.findOneById(param.id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param() param: FindUserByIdDto, @Body() payload: UpdateUserDto) {
    return this.usersService.update(param, payload)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param() param: FindUserByIdDto) {
    return this.usersService.delete(param)
  }
}
