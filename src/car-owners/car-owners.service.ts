import { BadRequestException, Injectable } from '@nestjs/common';
import { CarOwnersRepository } from './car-owners.repository';
import { CreateCarOwnerDto } from './dto/create-car-owner.dto';
import { UpdateCarOwnerDto } from './dto/update-car-owner.dto';
import { CarOwnerEntity } from 'src/entities/car-owner.entity';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { LicenseStatusesService } from 'src/license-statuses/license-statuses.service';

@Injectable()
export class CarOwnersService {
  constructor(
    private carOwnersRepository: CarOwnersRepository,
    private usersService: UsersService,
    private rolesService: RolesService,
    private licenseStatusesService: LicenseStatusesService,
  ) {}

  async getAllCarOwners(): Promise<CarOwnerEntity[]> {
    const result = await this.carOwnersRepository.getAllCarOwners();

    return result.map((carOwner) => new CarOwnerEntity(carOwner));
  }

  async getCarOwnerById(id: number): Promise<CarOwnerEntity> {
    const result = await this.carOwnersRepository.getCarOwnerById(id);

    if (result === null) {
      throw new BadRequestException('specified car owner does not exist');
    }

    return new CarOwnerEntity(result);
  }

  async createCarOwner(carOwner: CreateCarOwnerDto): Promise<CarOwnerEntity> {
    const {
      login,
      password,
      firstName,
      lastName,
      middleName,
      licenseStatusId,
    } = carOwner;
    const role = await this.rolesService.getRoleByName('carOwner');
    await this.licenseStatusesService.getLicenseStatusById(licenseStatusId);
    const user = await this.usersService.createUser({
      login,
      password,
      roleId: role.id,
    });
    const result = await this.carOwnersRepository.createCarOwner({
      firstName,
      lastName,
      middleName,
      licenseStatusId,
      userId: user.id,
    });

    return new CarOwnerEntity(result);
  }

  async updateCarOwnerById(
    id: number,
    carOwner: UpdateCarOwnerDto,
  ): Promise<CarOwnerEntity> {
    const carOwnerEntity = await this.getCarOwnerById(id);

    if (carOwnerEntity === null) {
      throw new BadRequestException('specified car owner does not exist');
    }

    const {
      login,
      password,
      firstName,
      lastName,
      middleName,
      licenseStatusId,
    } = carOwner;
    await this.licenseStatusesService.getLicenseStatusById(licenseStatusId);
    await this.usersService.updateUserById(carOwnerEntity.user.id, {
      login,
      password,
    });

    const result = await this.carOwnersRepository.updateCarOwnerById(id, {
      firstName,
      lastName,
      middleName,
      licenseStatusId,
    });

    return new CarOwnerEntity(result);
  }

  async deleteCarOwnerById(id: number): Promise<CarOwnerEntity> {
    const carOwnerEntity = await this.getCarOwnerById(id);

    if (carOwnerEntity === null) {
      throw new BadRequestException('specified car owner does not exist');
    }

    const result = await this.carOwnersRepository.deleteCarOwnerById(id);
    await this.usersService.deleteUserById(carOwnerEntity.user.id);

    return new CarOwnerEntity(result);
  }
}
