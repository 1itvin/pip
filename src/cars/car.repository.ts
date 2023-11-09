import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from '@prisma/client';

@Injectable({})
export class CarsRepository {
  constructor(private prismaService: PrismaService) {}

  async getAllCars(): Promise<Car[]> {
    return this.prismaService.car.findMany({
      include: {
        owner: {
          include: { licenseStatus: true, user: { include: { role: true } } },
        },
      },
    });
  }

  async getCarById(id: number): Promise<Car> {
    return this.prismaService.car.findFirst({
      where: { id },
      include: {
        owner: {
          include: { licenseStatus: true, user: { include: { role: true } } },
        },
      },
    });
  }

  async createCar(car: CreateCarDto): Promise<Car> {
    return this.prismaService.car.create({
      data: car,
      include: {
        owner: {
          include: { licenseStatus: true, user: { include: { role: true } } },
        },
      },
    });
  }

  async updateCarById(id: number, car: UpdateCarDto): Promise<Car> {
    return this.prismaService.car.update({
      where: { id },
      data: car,
      include: {
        owner: {
          include: { licenseStatus: true, user: { include: { role: true } } },
        },
      },
    });
  }

  async deleteCarById(id: number): Promise<Car> {
    return this.prismaService.car.delete({
      where: { id },
      include: {
        owner: {
          include: { licenseStatus: true, user: { include: { role: true } } },
        },
      },
    });
  }
}
