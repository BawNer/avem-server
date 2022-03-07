import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { CreateRoleDto } from "./dto/createRole.dto";
import { RolesService } from "./roles.service";
import { RolesResponseInterface } from "./types/rolesResponse.interface";

@Controller()
export class RolesController {
  constructor(
    private readonly rolesServivce: RolesService
  ) {}

  @Get('roles')
  async findAll(): Promise<RolesResponseInterface> {
    const roles = await this.rolesServivce.findAll()
    return { roles }
  }

  @Post('role')
  async createRole(@Body('role') createRoleDto: CreateRoleDto): Promise<RolesResponseInterface> {
    const role = await this.rolesServivce.createRole(createRoleDto)
    return { roles: role }
  }

  @Put('role/:id')
  async updateRole(@Param('id') roleId: number, @Body('role') createRoleDto: CreateRoleDto): Promise<RolesResponseInterface> {
    const role = await this.rolesServivce.updateRole(roleId, createRoleDto)
    return { roles: role }
  }

  @Delete('role/:id')
  async deleteRole(@Param('id') roleId: number): Promise<DeleteResult> {
    return await this.rolesServivce.deleteRole(roleId)
  }
}