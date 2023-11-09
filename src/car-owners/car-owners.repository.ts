import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateCarOwnerDto } from './dto/update-car-owner.dto';
import { CarOwner } from '@prisma/client';

@Injectable({})
export class CarOwnersRepository {
  constructor(private prismaService: PrismaService) {}

  async getAllCarOwners(): Promise<CarOwner[]> {
    return this.prismaService.carOwner.findMany({
      include: { licenseStatus: true, user: { include: { role: true } } },
    });
  }

  async getCarOwnerById(id: number): Promise<CarOwner> {
    return this.prismaService.carOwner.findFirst({
      where: { id },
      include: { licenseStatus: true, user: { include: { role: true } } },
    });
  }

  async createCarOwner(carOwner: {
    firstName: string;
    lastName: string;
    middleName?: string;
    licenseStatusId: number;
    userId: number;
  }): Promise<CarOwner> {
    return this.prismaService.carOwner.create({
      data: carOwner,
      include: { licenseStatus: true, user: { include: { role: true } } },
    });
  }

  async updateCarOwnerById(
    id: number,
    carOwner: UpdateCarOwnerDto,
  ): Promise<CarOwner> {
    return this.prismaService.carOwner.update({
      where: { id },
      data: carOwner,
      include: { licenseStatus: true, user: { include: { role: true } } },
    });
  }

  async deleteCarOwnerById(id: number): Promise<CarOwner> {
    return this.prismaService.carOwner.delete({
      where: { id },
      include: { licenseStatus: true, user: { include: { role: true } } },
    });
  }
}
