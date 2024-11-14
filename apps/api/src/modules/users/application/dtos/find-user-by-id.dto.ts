import { IsNotEmpty, IsUUID } from 'class-validator'

export class FindUserByIdDto {
  @IsUUID()
  @IsNotEmpty()
  id: string
}
