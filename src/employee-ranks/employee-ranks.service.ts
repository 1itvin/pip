import { BadRequestException, Injectable } from '@nestjs/common';
import { EmployeeRanksRepository } from './employee-ranks.repository';
import { CreateEmployeeRankDto } from './dto/create-employee-rank.dto';
import { UpdateEmployeeRankDto } from './dto/update-employee-rank.dto';
import { EmployeeRankEntity } from 'src/entities/employee-rank.entity';

@Injectable()
export class EmployeeRanksService {
  constructor(private employeeRanksRepository: EmployeeRanksRepository) {}

  async getAllEmployeeRanks(): Promise<EmployeeRankEntity[]> {
    const result = await this.employeeRanksRepository.getAllEmployeeRanks();

    return result.map((employeeRank) => new EmployeeRankEntity(employeeRank));
  }

  async getEmployeeRankById(id: number): Promise<EmployeeRankEntity> {
    const result = await this.employeeRanksRepository.getEmployeeRankById(id);

    if (result === null) {
      throw new BadRequestException('specified employee rank does not exist');
    }

    return new EmployeeRankEntity(result);
  }

  async createEmployeeRank(
    employeeRank: CreateEmployeeRankDto,
  ): Promise<EmployeeRankEntity> {
    const result = await this.employeeRanksRepository.createEmployeeRank(
      employeeRank,
    );

    return new EmployeeRankEntity(result);
  }

  async updateEmployeeRankById(
    id: number,
    employeeRank: UpdateEmployeeRankDto,
  ): Promise<EmployeeRankEntity> {
    if ((await this.getEmployeeRankById(id)) === null) {
      throw new BadRequestException('specified employee rank does not exist');
    }

    const result = await this.employeeRanksRepository.updateEmployeeRankById(
      id,
      employeeRank,
    );

    return new EmployeeRankEntity(result);
  }

  async deleteEmployeeRankById(id: number): Promise<EmployeeRankEntity> {
    if ((await this.getEmployeeRankById(id)) === null) {
      throw new BadRequestException('specified employee rank does not exist');
    }

    const result = await this.employeeRanksRepository.deleteEmployeeRankById(
      id,
    );

    return new EmployeeRankEntity(result);
  }
}
