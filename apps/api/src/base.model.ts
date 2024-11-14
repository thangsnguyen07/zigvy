export type BaseProps = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateProps<T> = {
  id: string
  props: T
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export abstract class BaseModel<Props> {
  protected abstract _id: string
  protected readonly props: Props
  private readonly _createdAt: Date
  private _updatedAt: Date
  private _deletedAt: Date | null

  constructor({ id, props, createdAt, updatedAt, deletedAt }: CreateProps<Props>) {
    this.setId(id)

    const now = new Date()
    this._createdAt = createdAt || now
    this._updatedAt = updatedAt || now
    this._deletedAt = deletedAt || null
    this.props = props
  }

  get id() {
    return this._id
  }

  private setId(id: string) {
    this._id = id
  }

  /**
   * Returns entity properties.
   * @return {*}  {Props & BaseProps}
   * @memberof BaseModel
   */
  public getProps(): Props & BaseProps {
    return {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
      ...this.props,
    }
  }
}
