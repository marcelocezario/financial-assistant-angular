export interface Currency {
  id?: string
  name: string
  symbol: string
  code: string
  priceInBRL: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}
