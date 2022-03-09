import { AuthGuard } from "@app/user/guards/auth.guard";
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { CreateRoleDto } from "./dto/createRole.dto";
import { RoleService } from "./role.service";
import { RolesResponseInterface } from "./types/rolesResponse.interface";

@Controller()
export class RoleController {
  constructor(
    private readonly roleServivce: RoleService
  ) {}

  @Get('roles')
  async findAll(): Promise<RolesResponseInterface> {
    const roles = await this.roleServivce.findAll()
    return { roles }
  }

  @Post('role')
  @UseGuards(AuthGuard)
  async createRole(@Body('role') createRoleDto: CreateRoleDto): Promise<RolesResponseInterface> {
    const role = await this.roleServivce.createRole(createRoleDto)
    return { roles: role }
  }

  @Put('role/:id')
  @UseGuards(AuthGuard)
  async updateRole(@Param('id') roleId: number, @Body('role') createRoleDto: CreateRoleDto): Promise<RolesResponseInterface> {
    const role = await this.roleServivce.updateRole(roleId, createRoleDto)
    return { roles: role }
  }

  @Delete('role/:id')
  @UseGuards(AuthGuard)
  async deleteRole(@Param('id') roleId: number): Promise<DeleteResult> {
    return await this.roleServivce.deleteRole(roleId)
  }
}