export interface Pageable<T> {
  page: number
  size: number
  sortField: keyof T
  sortDirection: 'asc' | 'desc'
}
