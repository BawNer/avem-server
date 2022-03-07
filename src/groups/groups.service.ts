import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGroupDto } from "./dto/createGroup.dto";
import { GroupsEntity } from "./groups.entity";
import { GroupResponseInterface } from "./types/responseGroup.interface";
import { GroupsResponseInterface } from "./types/responseGroups.interface";

@Injectable()
export class GroupsService {

  constructor(
    @InjectRepository(GroupsEntity)
    private readonly groupsRepository: Repository<GroupsEntity>
  ) {}

  async findAll(): Promise<GroupsResponseInterface> {
    const groups = await this.groupsRepository.find()
    return await this.buildResponseInteface(groups)
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<GroupsEntity> {
    const group = await this.groupsRepository.findOne({name: createGroupDto.name})

    if (group) {
      throw new HttpException(`Group with name ${createGroupDto.name} are exist`, HttpStatus.CONFLICT)
    }

    const newGroup = new GroupsEntity()

    Object.assign(newGroup, createGroupDto)

    return await this.groupsRepository.save(newGroup)
  }

  async updateGroup(id: number, createGroupDto: CreateGroupDto): Promise<GroupsEntity> {
    const group = await this.groupsRepository.findOne(id)

    if (!group) {
      throw new HttpException(`Group with id ${id} not found`, HttpStatus.NOT_FOUND)
    }

    Object.assign(group, createGroupDto)

    return await this.groupsRepository.save(group)
  }

  async deleteGroup(id: number) {
    const group = await this.groupsRepository.findOne(id)

    if (!group) {
      throw new HttpException(`Group with id ${id} not found`, HttpStatus.NOT_FOUND)
    }

    return await this.groupsRepository.delete(id)
  }

  async buildResponseInteface(groups: GroupsEntity[]): Promise<GroupsResponseInterface> {
    return { groups }
  }


}