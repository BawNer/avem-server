import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/createRole.dto";
import { RoleEntity } from "./role.entity";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {}

  async findAll(): Promise<RoleEntity[]> {
    return await this.roleRepository.find()
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({ name: createRoleDto.name })

    if (role) {
      throw new HttpException(`Role with name ${createRoleDto.name} exist`, HttpStatus.CONFLICT)
    }

    const newRole = new RoleEntity()

    Object.assign(newRole, createRoleDto)

    return await this.roleRepository.save(newRole)
  }

  async updateRole(id: number, createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne(id)

    if (!role) {
      throw new HttpException(`Role with id ${id} not found`, HttpStatus.FORBIDDEN)
    }

    Object.assign(role, createRoleDto)

    return await this.roleRepository.save(role)
  }

  async deleteRole(id: number) {
    const role = await this.roleRepository.findOne(id)

    if (!role) {
      throw new HttpException(`Role with id ${id} not found`, HttpStatus.FORBIDDEN)
    }

    return await this.roleRepository.delete(id)
  }
}