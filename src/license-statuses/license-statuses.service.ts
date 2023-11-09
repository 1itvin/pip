import { BadRequestException, Injectable } from '@nestjs/common';
import { LicenseStatusesRepository } from './license-statuses.repository';
import { CreateLicenseStatusDto } from './dto/create-license-status.dto';
import { UpdateLicenseStatusDto } from './dto/update-licese-status.dto';
import { LicenseStatusEntity } from 'src/entities/license-status.entity';

@Injectable()
export class LicenseStatusesService {
  constructor(private licenseStatusesRepository: LicenseStatusesRepository) {}

  async getAllLicenseStatuses(): Promise<LicenseStatusEntity[]> {
    const result = await this.licenseStatusesRepository.getAllLicenseStatuses();

    return result.map(
      (licenseStatus) => new LicenseStatusEntity(licenseStatus),
    );
  }

  async getLicenseStatusById(id: number): Promise<LicenseStatusEntity> {
    const result = await this.licenseStatusesRepository.getLicenseStatusById(
      id,
    );

    if (result === null) {
      throw new BadRequestException('specified license status does not exist');
    }

    return new LicenseStatusEntity(result);
  }

  async createLicenseStatus(
    licenseStatus: CreateLicenseStatusDto,
  ): Promise<LicenseStatusEntity> {
    const result = await this.licenseStatusesRepository.createLicenseStatus(
      licenseStatus,
    );

    return new LicenseStatusEntity(result);
  }

  async updateLicenseStatusById(
    id: number,
    licenseStatus: UpdateLicenseStatusDto,
  ): Promise<LicenseStatusEntity> {
    if ((await this.getLicenseStatusById(id)) === null) {
      throw new BadRequestException('specified license status does not exist');
    }

    const result = await this.licenseStatusesRepository.updateLicenseStatusById(
      id,
      licenseStatus,
    );

    return new LicenseStatusEntity(result);
  }

  async deleteLicenseStatusById(id: number): Promise<LicenseStatusEntity> {
    if ((await this.getLicenseStatusById(id)) === null) {
      throw new BadRequestException('specified license status does not exist');
    }

    const result = await this.licenseStatusesRepository.deleteLicenseStatusById(
      id,
    );

    return new LicenseStatusEntity(result);
  }
}
