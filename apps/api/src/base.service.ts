export interface ServiceBase {
  findAll(): Promise<unknown[]>
  search(params: unknown): Promise<unknown>
  findOneById(dto: unknown): Promise<unknown | null>
  create(dto: unknown | unknown[]): Promise<unknown>
  update(params: unknown, dto: unknown): Promise<unknown>
  delete(dto: unknown): Promise<boolean>
}
