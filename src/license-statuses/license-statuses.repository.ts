import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateLicenseStatusDto } from './dto/create-license-status.dto';
import { UpdateLicenseStatusDto } from './dto/update-licese-status.dto';
import { LicenseStatus } from '@prisma/client';

@Injectable({})
export class LicenseStatusesRepository {
  constructor(private prismaService: PrismaService) {}

  async getAllLicenseStatuses(): Promise<LicenseStatus[]> {
    return this.prismaService.licenseStatus.findMany();
  }

  async getLicenseStatusById(id: number): Promise<LicenseStatus> {
    return this.prismaService.licenseStatus.findFirst({
      where: { id },
    });
  }

  async createLicenseStatus(
    licenseStatus: CreateLicenseStatusDto,
  ): Promise<LicenseStatus> {
    return this.prismaService.licenseStatus.create({
      data: licenseStatus,
    });
  }

  async updateLicenseStatusById(
    id: number,
    licenseStatus: UpdateLicenseStatusDto,
  ): Promise<LicenseStatus> {
    return this.prismaService.licenseStatus.update({
      where: { id },
      data: licenseStatus,
    });
  }

  async deleteLicenseStatusById(id: number): Promise<LicenseStatus> {
    return this.prismaService.licenseStatus.delete({
      where: { id },
    });
  }
}
