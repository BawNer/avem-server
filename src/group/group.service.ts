import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGroupDto } from "./dto/createGroup.dto";
import { GroupEntity } from "./group.entity";
import { GroupResponseInterface } from "./types/responseGroup.interface";
import { GroupsResponseInterface } from "./types/responseGroups.interface";

@Injectable()
export class GroupService {

  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>
  ) {}

  async findAll(): Promise<GroupsResponseInterface> {
    const groups = await this.groupRepository.find()
    return await this.buildResponseInteface(groups)
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<GroupEntity> {
    const group = await this.groupRepository.findOne({name: createGroupDto.name})

    if (group) {
      throw new HttpException(`Group with name ${createGroupDto.name} are exist`, HttpStatus.CONFLICT)
    }

    const newGroup = new GroupEntity()

    Object.assign(newGroup, createGroupDto)

    return await this.groupRepository.save(newGroup)
  }

  async updateGroup(id: number, createGroupDto: CreateGroupDto): Promise<GroupEntity> {
    const group = await this.groupRepository.findOne(id)

    if (!group) {
      throw new HttpException(`Group with id ${id} not found`, HttpStatus.NOT_FOUND)
    }

    Object.assign(group, createGroupDto)

    return await this.groupRepository.save(group)
  }

  async deleteGroup(id: number) {
    const group = await this.groupRepository.findOne(id)

    if (!group) {
      throw new HttpException(`Group with id ${id} not found`, HttpStatus.NOT_FOUND)
    }

    return await this.groupRepository.delete(id)
  }

  async buildResponseInteface(groups: GroupEntity[]): Promise<GroupsResponseInterface> {
    return { groups }
  }


}