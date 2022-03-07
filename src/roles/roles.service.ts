import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/createRole.dto";
import { RolesEntity } from "./roles.entity";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>
  ) {}

  async findAll(): Promise<RolesEntity[]> {
    return await this.rolesRepository.find()
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<RolesEntity> {
    const role = await this.rolesRepository.findOne({ name: createRoleDto.name })

    if (role) {
      throw new HttpException(`Role with name ${createRoleDto.name} exist`, HttpStatus.CONFLICT)
    }

    const newRole = new RolesEntity()

    Object.assign(newRole, createRoleDto)

    return await this.rolesRepository.save(newRole)
  }

  async updateRole(id: number, createRoleDto: CreateRoleDto): Promise<RolesEntity> {
    const role = await this.rolesRepository.findOne(id)

    if (!role) {
      throw new HttpException(`Role with id ${id} not found`, HttpStatus.FORBIDDEN)
    }

    Object.assign(role, createRoleDto)

    return await this.rolesRepository.save(role)
  }

  async deleteRole(id: number) {
    const role = await this.rolesRepository.findOne(id)

    if (!role) {
      throw new HttpException(`Role with id ${id} not found`, HttpStatus.FORBIDDEN)
    }

    return await this.rolesRepository.delete(id)
  }
}