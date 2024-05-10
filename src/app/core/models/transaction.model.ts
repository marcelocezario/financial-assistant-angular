import { TransactionCategory } from "./transaction-category.model"
import { TransactionType } from "./transaction-type.enum"
import { User } from "./user.model"
import { Wallet } from "./wallet.model"

export interface Transaction {
  id: string
  amount: number
  moment: Date
  notes?: string
  type: TransactionType
  currentInstallment: number
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  user: User
  wallet: Wallet
  categories: TransactionCategory[]
}
