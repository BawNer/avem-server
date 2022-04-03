export class UpdateUserDto {
  readonly username?: string
  readonly roles?: {
    name: string,
    access: string[]
  }
}