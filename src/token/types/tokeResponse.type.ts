import { TokenEntity } from "../token.entity";

export type TokenResponseType = Omit<TokenEntity, 'userId' | 'id'>