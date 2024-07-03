import { TransactionCategory } from "./transaction-category.model"
import { TransactionMethod } from "./transaction-method.enum"
import { ClassificationType } from "./classification-type.enum"
import { Wallet } from "./wallet.model"

export interface Transaction {
  id: string
  amount: number
  dueDate: string
  paymentMoment?: string
  notes?: string
  type: ClassificationType
  method: TransactionMethod
  currentInstallment: number
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  userId: string
  wallet: Wallet
  categories: TransactionCategory[]
}
