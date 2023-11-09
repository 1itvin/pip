import { BadRequestException, Injectable } from '@nestjs/common';
import { EmployeesRepository } from './employees.repository';
import { EmployeeEntity } from 'src/entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
import { EmployeeRanksService } from 'src/employee-ranks/employee-ranks.service';

@Injectable()
export class EmployeesService {
  constructor(
    private employeesRepository: EmployeesRepository,
    private rolesService: RolesService,
    private usersService: UsersService,
    private employeeRanksService: EmployeeRanksService,
  ) {}

  async getAllEmployees(): Promise<EmployeeEntity[]> {
    const result = await this.employeesRepository.getAllEmployees();

    return result.map((employee) => new EmployeeEntity(employee));
  }

  async getEmployeeById(id: number): Promise<EmployeeEntity> {
    const result = await this.employeesRepository.getEmployeeById(id);

    if (result === null) {
      throw new BadRequestException('specified employee does not exist');
    }

    return new EmployeeEntity(result);
  }

  async createEmployee(employee: CreateEmployeeDto): Promise<EmployeeEntity> {
    const { login, password, firstName, lastName, middleName, rankId } =
      employee;
    const role = await this.rolesService.getRoleByName('employee');
    await this.employeeRanksService.getEmployeeRankById(rankId);
    const user = await this.usersService.createUser({
      login,
      password,
      roleId: role.id,
    });
    const result = await this.employeesRepository.createEmployee({
      firstName,
      lastName,
      middleName,
      rankId,
      userId: user.id,
    });

    return new EmployeeEntity(result);
  }

  async updateEmployeeById(
    id: number,
    employee: UpdateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const employeeEntity = await this.getEmployeeById(id);

    if (employeeEntity === null) {
      throw new BadRequestException('specified employee does not exist');
    }
    const { login, password, firstName, lastName, middleName, rankId } =
      employee;
    await this.employeeRanksService.getEmployeeRankById(rankId);
    await this.usersService.updateUserById(employeeEntity.user.id, {
      login,
      password,
    });

    const result = await this.employeesRepository.updateEmployeeById(id, {
      firstName,
      lastName,
      middleName,
      rankId,
    });

    return new EmployeeEntity(result);
  }

  async deleteEmployeeById(id: number): Promise<EmployeeEntity> {
    const employeeEntity = await this.getEmployeeById(id);

    if (employeeEntity === null) {
      throw new BadRequestException('specified employee does not exist');
    }

    const result = await this.employeesRepository.deleteEmployeeById(id);
    await this.usersService.deleteUserById(employeeEntity.user.id);

    return new EmployeeEntity(result);
  }
}
