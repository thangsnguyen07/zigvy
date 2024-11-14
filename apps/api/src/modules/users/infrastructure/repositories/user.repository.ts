import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Paginated } from '@/base.repository'
import { Like, Repository } from 'typeorm'

import { SearchUsersQueryDto } from '../../application/dtos/search-param.dto'
import { User } from '../../domain/user.model'
import { UserRepositoryPort } from '../../domain/user.repository.port'
import { UserEntity } from '../entities/user.entity'

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneById(id: string): Promise<User | null> {
    const entity = await this.userRepository.findOneBy({ id })
    return entity ? User.loadFromEntity(entity) : null
  }

  async findOneByUsername(username: string): Promise<User | null> {
    const entity = await this.userRepository.findOneBy({ username })
    return entity ? User.loadFromEntity(entity) : null
  }

  async findAll(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  async save(model: User | User[]): Promise<User | User[]> {
    const models = Array.isArray(model) ? model : [model]

    const entities = models.map((model) => model.getProps())

    const result = await this.userRepository.save(entities)

    return result.map(User.loadFromEntity)
  }

  async delete(model: User): Promise<boolean> {
    const result = await this.userRepository.softDelete(model.id)
    return !!result
  }

  async findAllPaginated(params: SearchUsersQueryDto): Promise<Paginated<User>> {
    const { page, limit, orderBy } = params

    const [data, count] = await this.userRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      where: { username: Like(`%${params.username}%`) },
      order: orderBy?.field ? { [orderBy.field]: orderBy.param } : { createdAt: orderBy.param },
    })

    return {
      count,
      page,
      limit,
      data: data.map(User.loadFromEntity),
    }
  }
}
