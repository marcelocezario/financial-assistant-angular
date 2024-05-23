export interface Pageable<T> {
  page: number
  size: number
  sort: Array<[keyof T, 'asc' | 'desc']>
}
