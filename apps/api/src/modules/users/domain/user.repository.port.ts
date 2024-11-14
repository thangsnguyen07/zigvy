import { RepositoryBase } from '@/base.repository'

import { User } from './user.model'

export interface UserRepositoryPort extends RepositoryBase<User> {
  findOneByUsername(username: string): Promise<User | null>
}
