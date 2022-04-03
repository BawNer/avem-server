import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { User } from "./decorators/user.decorator";
import { CreateUserDto } from "./dto/createUsers.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { AuthGuard } from "./guards/auth.guard";
import { UserResponseInterface } from "./types/userResponse.interface";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @Post('user')
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto)
    return { user }
  }

  @Post('user/login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
    const user = await this.userService.loginUser(loginUserDto)
    return { user }
  }

  @Put('user')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateUser(@Body('user') updateUserDto: UpdateUserDto, @User() currentUser: UserEntity): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(updateUserDto, currentUser)
    return { user }
  }
}