import { UserEntity } from "../user.entity";

export type UsersType = Omit<UserEntity, 'hashPassword'>