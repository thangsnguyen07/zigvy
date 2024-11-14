import { User } from '../domain/user.model'
import { UserDto } from './dtos/user.dto'

export class UserMapper {
  static toDto(user: User | User[]): UserDto | UserDto[] {
    const mapUser = (u: User) => ({
      id: u.id,
      username: u.getProps().username,
      name: u.getProps().name,
      dateOfBirth: u.getProps().dateOfBirth,
      createdAt: u.getProps().createdAt,
    })

    return Array.isArray(user) ? user.map(mapUser) : mapUser(user)
  }
}
