import { UserRole } from "./user-role.enum"

export interface User {
  id?: string
  nickname: string
  email: string
  password?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  roles: UserRole[]
}
