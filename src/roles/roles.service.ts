import { BadRequestException, Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { RoleEntity } from 'src/entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async getAllRoles(): Promise<RoleEntity[]> {
    const result = await this.rolesRepository.getAllRoles();

    return result.map((role) => new RoleEntity(role));
  }

  async getRoleById(id: number): Promise<RoleEntity> {
    const result = await this.rolesRepository.getRoleById(id);

    if (result === null) {
      throw new BadRequestException('specified role does not exist');
    }

    return new RoleEntity(result);
  }

  async getRoleByName(name: string): Promise<RoleEntity> {
    const result = await this.rolesRepository.getRoleByName(name);

    if (result === null) {
      throw new BadRequestException('specified role does not exist');
    }

    return new RoleEntity(result);
  }

  async createRole(role: CreateRoleDto): Promise<RoleEntity> {
    const result = await this.rolesRepository.createRole(role);

    return new RoleEntity(result);
  }

  async updateRoleById(id: number, role: UpdateRoleDto): Promise<RoleEntity> {
    if ((await this.getRoleById(id)) === null) {
      throw new BadRequestException('specified role does not exist');
    }

    const result = await this.rolesRepository.updateRoleById(id, role);

    return new RoleEntity(result);
  }

  async deleteRoleById(id: number): Promise<RoleEntity> {
    if ((await this.getRoleById(id)) === null) {
      throw new BadRequestException('specified role does not exist');
    }

    const result = await this.rolesRepository.deleteRoleById(id);

    return new RoleEntity(result);
  }
}
