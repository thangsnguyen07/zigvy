import { BaseModel } from '@/base.model'
import { randomUUID } from 'crypto'

import { UserEntity } from '../infrastructure/entities/user.entity'
import { UserProps } from './user.type'
import { Password } from './value-object/password.vo'

export class User extends BaseModel<UserProps> {
  protected readonly _id: string

  static create(payload: UserProps): User {
    const id = randomUUID()

    const user = new User({ id, props: payload })

    return user
  }

  update(fields: Partial<UserProps>): void {
    if (fields.name) {
      this.props.name = fields.name
    }

    if (fields.username) {
      this.props.username = fields.username
    }

    if (fields.dateOfBirth) {
      this.props.dateOfBirth = fields.dateOfBirth
    }
  }

  async setPassword(password: string): Promise<void> {
    this.props.password = (await Password.create(password)).getHashedValue()
  }

  static loadFromEntity(entity: UserEntity): User {
    const { id, createdAt, updatedAt, deletedAt, ...props } = entity

    return new User({ id, props, createdAt, updatedAt, deletedAt })
  }
}
