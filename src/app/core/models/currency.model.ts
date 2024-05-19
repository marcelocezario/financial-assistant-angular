export interface Currency {
  id?: string
  symbol: string
  code: string
  brlRate: number
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}
