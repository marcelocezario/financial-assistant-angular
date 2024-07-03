import { ClassificationType } from "./classification-type.enum"

export interface Category {
  id?: string
  name: string
  icon: string
  color: string
  type: ClassificationType
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  userId?: string
}
