import { HttpException, Inject, Injectable, NotFoundException, Query } from '@nestjs/common'

import { User } from '../domain/user.model'
import { UserRepositoryPort } from '../domain/user.repository.port'
import { UserServicePort } from '../domain/user.service.port'
import { Password } from '../domain/value-object/password.vo'
import { CreateUserDto } from './dtos/create-user.dto'
import { FindUserByIdDto } from './dtos/find-user-by-id.dto'
import { SearchUsersQueryDto } from './dtos/search-param.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { InjectionToken } from './injection-token'
import { UserMapper } from './users.mapper'

@Injectable()
export class UsersService implements UserServicePort {
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY) private readonly repository: UserRepositoryPort,
  ) {}

  async create(payload: CreateUserDto) {
    const { username, password } = payload

    const user = await this.repository.findOneByUsername(username)

    if (user) {
      throw new HttpException('User with this username already exists', 400)
    }

    const hashedPassword = await Password.create(password)

    const newUser = User.create({ ...payload, password: hashedPassword.getHashedValue() })
    const result = await this.repository.save(newUser)

    return UserMapper.toDto(result)[0]
  }

  async update(param: FindUserByIdDto, payload: UpdateUserDto) {
    const { id } = param
    const user = await this.repository.findOneById(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (payload.username) {
      const isUsernameTaken = !!(await this.repository.findOneByUsername(payload.username))

      if (isUsernameTaken && user.getProps().username !== payload.username) {
        throw new HttpException('User with this username already exists', 400)
      }
    }

    user.update(payload)

    const result = await this.repository.save(user)

    return UserMapper.toDto(result)[0]
  }

  async delete(param: FindUserByIdDto) {
    const { id } = param

    const user = await this.repository.findOneById(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    console.log(user)

    return this.repository.delete(user)
  }

  async findAll(): Promise<User[]> {
    const users = await this.repository.findAll()
    return users
  }

  async findOneById(param: FindUserByIdDto) {
    const user = await this.repository.findOneById(param.id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return UserMapper.toDto(user)
  }

  async search(@Query() query: SearchUsersQueryDto) {
    const result = await this.repository.findAllPaginated(query)

    return {
      count: result.count,
      page: result.page,
      limit: result.limit,
      data: UserMapper.toDto(result.data),
    }
  }
}
