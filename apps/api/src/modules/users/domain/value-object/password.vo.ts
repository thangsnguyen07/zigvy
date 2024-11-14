import { HttpException } from '@nestjs/common'

import * as bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export class Password {
  private readonly hashedPassword: string

  constructor(password: string) {
    this.hashedPassword = password
  }

  static async create(plainPassword: string): Promise<Password> {
    if (plainPassword.length < 6) {
      throw new HttpException('Password must be more than 6 characters', 400)
    }

    const hashedPassword = await Password.hashPassword(plainPassword)
    return new Password(hashedPassword)
  }

  private static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS)
  }

  async matches(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.hashedPassword)
  }

  getHashedValue(): string {
    return this.hashedPassword
  }

  get password(): string {
    return this.hashedPassword
  }
}
