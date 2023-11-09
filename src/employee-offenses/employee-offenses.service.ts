import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { EmployeeOffensesRepository } from './employee-offenses.repository';
import { CreateEmployeeOffenseDto } from './dto/create-employee-offenses.dto';
import { UpdateEmployeeOffenseDto } from './dto/update-employee-offenses.dto';
import { EmployeeOffenseEntity } from 'src/entities/employee-offense.entity';
import { OffensesService } from 'src/offenses/offense.service';
import { EmployeesService } from 'src/employees/employees.service';
import { EmployeeOffense } from '@prisma/client';

@Injectable()
export class EmployeeOffensesService {
  constructor(
    private employeeOffensesRepository: EmployeeOffensesRepository,
    @Inject(forwardRef(() => OffensesService))
    private offensesService: OffensesService,
    private employeesService: EmployeesService,
  ) {}

  async getAllEmployeeOffenses({
    employeeId,
    offenseId,
  }): Promise<EmployeeOffenseEntity[]> {
    let result: EmployeeOffense[];

    if ((employeeId && offenseId) || (!employeeId && !offenseId)) {
      result = await this.employeeOffensesRepository.getAllEmployeeOffenses();
    } else if (employeeId) {
      result =
        await this.employeeOffensesRepository.getAllEmployeeOffensesByEmployeeId(
          employeeId,
        );
    } else if (offenseId) {
      result =
        await this.employeeOffensesRepository.getAllEmployeeOffensesByOffenseId(
          offenseId,
        );
    } else {
      result = await this.employeeOffensesRepository.getAllEmployeeOffenses();
    }

    return result.map((offense) => new EmployeeOffenseEntity(offense));
  }

  async getAllEmployeeOffensesByEmployeeId(
    id: number,
  ): Promise<EmployeeOffenseEntity[]> {
    const result =
      await this.employeeOffensesRepository.getAllEmployeeOffensesByEmployeeId(
        id,
      );

    return result.map((offense) => new EmployeeOffenseEntity(offense));
  }

  async getAllEmployeeOffensesByOffenseId(
    id: number,
  ): Promise<EmployeeOffenseEntity[]> {
    const result =
      await this.employeeOffensesRepository.getAllEmployeeOffensesByOffenseId(
        id,
      );

    return result.map((offense) => new EmployeeOffenseEntity(offense));
  }

  async getEmployeeOffenseById(id: number): Promise<EmployeeOffenseEntity> {
    const result = await this.employeeOffensesRepository.getEmployeeOffenseById(
      id,
    );

    if (result === null) {
      throw new BadRequestException(
        'specified employee offense does not exist',
      );
    }

    return new EmployeeOffenseEntity(result);
  }

  async createEmployeeOffense(
    offense: CreateEmployeeOffenseDto,
  ): Promise<EmployeeOffenseEntity> {
    await this.employeesService.getEmployeeById(offense.employeeId);
    await this.offensesService.getOffenseById(offense.offenseId);

    const result = await this.employeeOffensesRepository.createEmployeeOffense(
      offense,
    );

    return new EmployeeOffenseEntity(result);
  }

  async updateEmployeeOffenseById(
    id: number,
    offense: UpdateEmployeeOffenseDto,
  ): Promise<EmployeeOffenseEntity> {
    if ((await this.getEmployeeOffenseById(id)) === null) {
      throw new BadRequestException(
        'specified employee offense does not exist',
      );
    }

    if (offense.employeeId) {
      await this.employeesService.getEmployeeById(offense.employeeId);
    }
    if (offense.offenseId) {
      await this.offensesService.getOffenseById(offense.offenseId);
    }

    const result =
      await this.employeeOffensesRepository.updateEmployeeOffenseById(
        id,
        offense,
      );

    return new EmployeeOffenseEntity(result);
  }

  async deleteEmployeeOffensesByOffenseId(
    offenseId: number,
  ): Promise<EmployeeOffenseEntity> {
    await this.employeeOffensesRepository.deleteEmployeeOffensesByOffenseId(
      offenseId,
    );

    return;
  }

  async deleteEmployeeOffenseById(id: number): Promise<EmployeeOffenseEntity> {
    if ((await this.getEmployeeOffenseById(id)) === null) {
      throw new BadRequestException(
        'specified employee offense does not exist',
      );
    }

    const result =
      await this.employeeOffensesRepository.deleteEmployeeOffenseById(id);

    return new EmployeeOffenseEntity(result);
  }
}
