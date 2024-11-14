import { IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string

  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  dob: string
}
