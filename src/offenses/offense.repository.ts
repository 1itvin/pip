import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOffenseDto } from './dto/create-offense.dto';
import { UpdateOffenseDto } from './dto/update-offense.dto';
import { Offense } from '@prisma/client';

@Injectable({})
export class OffensesRepository {
  constructor(private prismaService: PrismaService) {}

  async getAllOffenses(): Promise<Offense[]> {
    return this.prismaService.offense.findMany({
      include: {
        suspect: {
          include: { licenseStatus: true },
        },
        car: true,
      },
    });
  }

  async getOffenseById(id: number): Promise<Offense> {
    return this.prismaService.offense.findFirst({
      where: { id },
      include: {
        suspect: {
          include: { licenseStatus: true },
        },
        car: true,
      },
    });
  }

  async createOffense(
    offense: Omit<CreateOffenseDto, 'employeeIds'>,
  ): Promise<Offense> {
    return this.prismaService.offense.create({
      data: offense,
      include: {
        suspect: {
          include: { licenseStatus: true },
        },
        car: true,
      },
    });
  }

  async updateOffenseById(
    id: number,
    offense: UpdateOffenseDto,
  ): Promise<Offense> {
    return this.prismaService.offense.update({
      where: { id },
      data: offense,
      include: {
        suspect: {
          include: { licenseStatus: true },
        },
        car: true,
      },
    });
  }

  async deleteOffenseById(id: number): Promise<Offense> {
    return this.prismaService.offense.delete({
      where: { id },
      include: {
        suspect: {
          include: { licenseStatus: true },
        },
        car: true,
      },
    });
  }
}
