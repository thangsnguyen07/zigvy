import { OrderBy, PaginatedQueryParams } from '@/base.repository'
import { Type } from 'class-transformer'
import { IsOptional, IsString, Min } from 'class-validator'

export class SearchUsersQueryDto implements PaginatedQueryParams {
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  limit: number = 10

  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page: number = 1

  @Type(() => Number)
  @IsOptional()
  offset: number

  @IsOptional()
  orderBy: OrderBy = { field: 'createdAt', param: 'desc' }

  @IsString()
  @IsOptional()
  username: string
}
