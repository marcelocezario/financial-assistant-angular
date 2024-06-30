import { Category } from "./category.model";
import { TransactionType } from "./transaction-type.enum";

export interface TransactionCategory {
  category: Category
  amount: number
  type: TransactionType
}
