import { UsersEntity } from "../user.entity";

export type UsersType = Omit<UsersEntity, 'hashPassword'>