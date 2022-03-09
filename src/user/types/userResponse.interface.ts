import { UsersType } from "./users.types";

export interface UserResponseInterface {
  user: UsersType & { token: string }
}