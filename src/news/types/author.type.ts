import { UsersType } from "@app/user/types/users.types";

export type AuthorType = Omit<UsersType, "phone" | "refreshToken" | "isEmailActive" | "isPhoneActive">