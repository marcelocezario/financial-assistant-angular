import { Currency } from "./currency.model"
import { User } from "./user.model"

export interface Wallet {
  id?: string
  name: string
  balance: number
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  user: User
  currency: Currency
}
