export declare class Paginated<T> {
  readonly count: number
  readonly limit: number
  readonly page: number
  readonly data: T[]
  constructor(props: Paginated<T>)
}

export type OrderBy = {
  field: string
  param: 'asc' | 'desc'
}

export interface PaginatedQueryParams {
  limit: number
  page: number
  offset: number
  orderBy: OrderBy
}

export interface RepositoryBase<Entity> {
  save(entity: Entity | Entity[]): Promise<Entity | Entity[]>
  findOneById(id: string): Promise<Entity | null>
  findAll(): Promise<Entity[]>
  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Entity>>
  delete(entity: Entity): Promise<boolean>
}
