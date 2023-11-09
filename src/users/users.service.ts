import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private rolesService: RolesService,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    const result = await this.usersRepository.getAllUsers();

    return result.map((user) => new UserEntity(user));
  }

  async getUserById(id: number): Promise<UserEntity> {
    const result = await this.usersRepository.getUserById(id);

    if (result === null) {
      throw new BadRequestException('specified user does not exist');
    }

    return new UserEntity(result);
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    await this.rolesService.getRoleById(user.roleId);

    const result = await this.usersRepository.createUser(user);

    return new UserEntity(result);
  }

  async updateUserById(id: number, user: UpdateUserDto): Promise<UserEntity> {
    if ((await this.getUserById(id)) === null) {
      throw new BadRequestException('specified user does not exist');
    }

    if (user.roleId) {
      await this.rolesService.getRoleById(user.roleId);
    }

    const result = await this.usersRepository.updateUserById(id, user);

    return new UserEntity(result);
  }

  async deleteUserById(id: number): Promise<UserEntity> {
    if ((await this.getUserById(id)) === null) {
      throw new BadRequestException('specified user does not exist');
    }

    const result = await this.usersRepository.deleteUserById(id);

    return new UserEntity(result);
  }
}
