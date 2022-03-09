import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { CreateGroupDto } from "./dto/createGroup.dto";
import { GroupService } from "./group.service";
import { GroupResponseInterface } from "./types/responseGroup.interface";
import { GroupsResponseInterface } from "./types/responseGroups.interface";

@Controller()
export class GroupController {

  constructor(
    private readonly groupService: GroupService
  ) {}
  
  @Get('groups')
  async findAll(): Promise<GroupsResponseInterface> {
    const groups = await this.groupService.findAll()
    return groups 
  }

  @Post('group')
  async createGroup(@Body('group') createGroupDto: CreateGroupDto): Promise<GroupResponseInterface> {
    const group = await this.groupService.createGroup(createGroupDto)
    return {group}
  }

  @Put('group/:id')
  async updateGroup(@Param('id') groupId: number, @Body('group') createGroupDto: CreateGroupDto): Promise<GroupResponseInterface> {
    const group = await this.groupService.updateGroup(groupId, createGroupDto)
    return {group}
  }

  @Delete('group/:id')
  async deleteGroup(@Param('id') groupId: number): Promise<DeleteResult> {
    return await this.groupService.deleteGroup(groupId)
  }

}