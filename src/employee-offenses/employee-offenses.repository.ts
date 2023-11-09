import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateEmployeeOffenseDto } from './dto/create-employee-offenses.dto';
import { UpdateEmployeeOffenseDto } from './dto/update-employee-offenses.dto';
import { EmployeeOffense } from '@prisma/client';

type BatchPayload = {
  count: number;
};

@Injectable({})
export class EmployeeOffensesRepository {
  constructor(private prismaService: PrismaService) {}

  async getAllEmployeeOffenses(): Promise<EmployeeOffense[]> {
    return this.prismaService.employeeOffense.findMany({
      include: {
        offense: true,
        employee: true,
      },
    });
  }

  async getAllEmployeeOffensesByEmployeeId(
    employeeId: number,
  ): Promise<EmployeeOffense[]> {
    return this.prismaService.employeeOffense.findMany({
      where: { employeeId },
      include: {
        offense: true,
        employee: true,
      },
    });
  }

  async getAllEmployeeOffensesByOffenseId(
    offenseId: number,
  ): Promise<EmployeeOffense[]> {
    return this.prismaService.employeeOffense.findMany({
      where: { offenseId },
      include: {
        offense: true,
        employee: true,
      },
    });
  }

  async getEmployeeOffenseById(id: number): Promise<EmployeeOffense> {
    return this.prismaService.employeeOffense.findFirst({
      where: { id },
      include: {
        offense: true,
        employee: true,
      },
    });
  }

  async createEmployeeOffense(
    employeeOffense: CreateEmployeeOffenseDto,
  ): Promise<EmployeeOffense> {
    return this.prismaService.employeeOffense.create({
      data: employeeOffense,
      include: {
        offense: true,
        employee: true,
      },
    });
  }

  async updateEmployeeOffenseById(
    id: number,
    employeeOffense: UpdateEmployeeOffenseDto,
  ): Promise<EmployeeOffense> {
    return this.prismaService.employeeOffense.update({
      where: { id },
      data: employeeOffense,
      include: {
        offense: true,
        employee: true,
      },
    });
  }

  async deleteEmployeeOffensesByOffenseId(
    offenseId: number,
  ): Promise<BatchPayload> {
    return this.prismaService.employeeOffense.deleteMany({
      where: { offenseId },
    });
  }

  async deleteEmployeeOffenseById(id: number): Promise<EmployeeOffense> {
    return this.prismaService.employeeOffense.delete({
      where: { id },
      include: {
        offense: true,
        employee: true,
      },
    });
  }
}
