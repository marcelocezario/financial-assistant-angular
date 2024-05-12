import { UserRole } from "../../core/models";

export interface LocalUser {
  email?: string
  exp?: number
  nickname?: string
  userId?: string
  accessToken?: string
  roles?: UserRole[]
}
