import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { OffensesRepository } from './offense.repository';
import { CreateOffenseDto } from './dto/create-offense.dto';
import { UpdateOffenseDto } from './dto/update-offense.dto';
import { OffenseEntity } from 'src/entities/offense.entity';
import { CarsService } from 'src/cars/car.service';
import { CarOwnersService } from 'src/car-owners/car-owners.service';
import { EmployeeOffensesService } from 'src/employee-offenses/employee-offenses.service';

@Injectable()
export class OffensesService {
  constructor(
    private offensesRepository: OffensesRepository,
    private carsService: CarsService,
    private carOwnersService: CarOwnersService,
    @Inject(forwardRef(() => EmployeeOffensesService))
    private employeeOffensesService: EmployeeOffensesService,
  ) {}

  async getAllOffenses(): Promise<OffenseEntity[]> {
    const result = await this.offensesRepository.getAllOffenses();

    return result.map((offense) => new OffenseEntity(offense));
  }

  async getOffenseById(id: number): Promise<OffenseEntity> {
    const result = await this.offensesRepository.getOffenseById(id);

    if (result === null) {
      throw new BadRequestException('specified offense does not exist');
    }

    return new OffenseEntity(result);
  }

  async createOffense(offense: CreateOffenseDto): Promise<OffenseEntity> {
    this.carsService.getCarById(offense.carId);
    this.carOwnersService.getCarOwnerById(offense.suspectId);

    const { employeeIds, ...rest } = offense;

    const result = await this.offensesRepository.createOffense(rest);
    await Promise.all(
      employeeIds.map((id) =>
        this.employeeOffensesService.createEmployeeOffense({
          offenseId: result.id,
          employeeId: id,
        }),
      ),
    );

    return new OffenseEntity(result);
  }

  async updateOffenseById(
    id: number,
    offense: UpdateOffenseDto,
  ): Promise<OffenseEntity> {
    if ((await this.getOffenseById(id)) === null) {
      throw new BadRequestException('specified offense does not exist');
    }

    if (offense.carId) {
      this.carsService.getCarById(offense.carId);
    }
    if (offense.suspectId) {
      this.carOwnersService.getCarOwnerById(offense.suspectId);
    }

    const result = await this.offensesRepository.updateOffenseById(id, offense);

    return new OffenseEntity(result);
  }

  async deleteOffenseById(id: number): Promise<OffenseEntity> {
    if ((await this.getOffenseById(id)) === null) {
      throw new BadRequestException('specified offense does not exist');
    }

    const result = await this.offensesRepository.deleteOffenseById(id);
    await this.employeeOffensesService.deleteEmployeeOffensesByOffenseId(id);

    return new OffenseEntity(result);
  }
}
