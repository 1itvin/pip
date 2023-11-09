import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from '@prisma/client';

@Injectable({})
export class EmployeesRepository {
  constructor(private prismaService: PrismaService) {}

  async getAllEmployees(): Promise<Employee[]> {
    return this.prismaService.employee.findMany({
      include: { rank: true, user: { include: { role: true } } },
    });
  }

  async getEmployeeById(id: number): Promise<Employee> {
    return this.prismaService.employee.findFirst({
      where: { id },
      include: { rank: true, user: { include: { role: true } } },
    });
  }

  async createEmployee(employee: {
    firstName: string;
    lastName: string;
    middleName?: string;
    rankId: number;
    userId: number;
  }): Promise<Employee> {
    return this.prismaService.employee.create({
      data: employee,
      include: { rank: true, user: { include: { role: true } } },
    });
  }

  async updateEmployeeById(
    id: number,
    employee: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.prismaService.employee.update({
      where: { id },
      data: employee,
      include: { rank: true, user: { include: { role: true } } },
    });
  }

  async deleteEmployeeById(id: number): Promise<Employee> {
    return this.prismaService.employee.delete({
      where: { id },
      include: { rank: true, user: { include: { role: true } } },
    });
  }
}
