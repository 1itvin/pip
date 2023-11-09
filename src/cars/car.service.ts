import { BadRequestException, Injectable } from '@nestjs/common';
import { CarsRepository } from './car.repository';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarEntity } from 'src/entities/car.entity';
import { CarOwnersService } from 'src/car-owners/car-owners.service';

@Injectable()
export class CarsService {
  constructor(
    private carsRepository: CarsRepository,
    private carOwnersService: CarOwnersService,
  ) {}

  async getAllCars(): Promise<CarEntity[]> {
    const result = await this.carsRepository.getAllCars();

    return result.map((car) => new CarEntity(car));
  }

  async getCarById(id: number): Promise<CarEntity> {
    const result = await this.carsRepository.getCarById(id);

    if (result === null) {
      throw new BadRequestException('specified car does not exist');
    }

    return new CarEntity(result);
  }

  async createCar(car: CreateCarDto): Promise<CarEntity> {
    await this.carOwnersService.getCarOwnerById(car.ownerId);

    const result = await this.carsRepository.createCar(car);

    return new CarEntity(result);
  }

  async updateCarById(id: number, car: UpdateCarDto): Promise<CarEntity> {
    if ((await this.getCarById(id)) === null) {
      throw new BadRequestException('specified car does not exist');
    }

    await this.carOwnersService.getCarOwnerById(car.ownerId);

    const result = await this.carsRepository.updateCarById(id, car);

    return new CarEntity(result);
  }

  async deleteCarById(id: number): Promise<CarEntity> {
    if ((await this.getCarById(id)) === null) {
      throw new BadRequestException('specified car does not exist');
    }

    const result = await this.carsRepository.deleteCarById(id);

    return new CarEntity(result);
  }
}
