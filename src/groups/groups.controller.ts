import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { CreateGroupDto } from "./dto/createGroup.dto";
import { GroupsService } from "./groups.service";
import { GroupResponseInterface } from "./types/responseGroup.interface";
import { GroupsResponseInterface } from "./types/responseGroups.interface";

@Controller()
export class GroupsController {

  constructor(
    private readonly groupsService: GroupsService
  ) {}
  
  @Get('groups')
  async findAll(): Promise<GroupsResponseInterface> {
    const groups = await this.groupsService.findAll()
    return groups 
  }

  @Post('group')
  async createGroup(@Body('group') createGroupDto: CreateGroupDto): Promise<GroupResponseInterface> {
    const group = await this.groupsService.createGroup(createGroupDto)
    return {group}
  }

  @Put('group/:id')
  async updateGroup(@Param('id') groupId: number, @Body('group') createGroupDto: CreateGroupDto): Promise<GroupResponseInterface> {
    const group = await this.groupsService.updateGroup(groupId, createGroupDto)
    return {group}
  }

  @Delete('group/:id')
  async deleteGroup(@Param('id') groupId: number): Promise<DeleteResult> {
    return await this.groupsService.deleteGroup(groupId)
  }

}