import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUsers.dto";
import { UserResponseInterface } from "./types/userResponse.interface";
import { UsersResponseInterface } from "./types/usersResponse.interface";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @Get('users')
  async findAll(): Promise<UsersResponseInterface> {
    const users = await this.userService.findAll()
    return { users }
  }

  @Get('user/:id')
  async findById(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.findById(id)
  }

  @Post('user')
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto)
    return await this.userService.buildUserResponse(user)
  }
}