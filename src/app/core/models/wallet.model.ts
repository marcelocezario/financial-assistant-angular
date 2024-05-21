import { Currency } from "./currency.model"
import { User } from "./user.model"
import { WalletType } from "./wallet-type.enum"

export interface Wallet {
  id?: string
  name: string
  balance: number
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  userId: string
  currency: Currency,
  type: WalletType
}
