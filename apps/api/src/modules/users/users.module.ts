import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { InjectionToken } from './application/injection-token'
import { UsersService } from './application/users.service'

import { UserEntity } from './infrastructure/entities/user.entity'
import { UserRepository } from './infrastructure/repositories/user.repository'

import { UsersController } from './presentation/users.controller'

const providers: Provider[] = [
  {
    provide: InjectionToken.USER_SERVICE,
    useClass: UsersService,
  },
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepository,
  },
]
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [...providers],
})
export class UsersModule {}
