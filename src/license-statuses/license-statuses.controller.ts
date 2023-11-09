import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LicenseStatusesService } from './license-statuses.service';
import { CreateLicenseStatusDto } from './dto/create-license-status.dto';
import { UpdateLicenseStatusDto } from './dto/update-licese-status.dto';
import HttpResponse from 'src/utils/http-response';

@Controller('license-statuses')
export class LicenseStatusesController {
  constructor(private licenseStatusesService: LicenseStatusesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAllLicenseStatuses() {
    const result = await this.licenseStatusesService.getAllLicenseStatuses();

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getLicenseStatusById(@Param('id') id: number) {
    const result = await this.licenseStatusesService.getLicenseStatusById(id);

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createLicenseStatus(
    @Body() createLicenseStatusDto: CreateLicenseStatusDto,
  ) {
    const result = await this.licenseStatusesService.createLicenseStatus(
      createLicenseStatusDto,
    );

    return new HttpResponse(HttpStatus.CREATED, 'success', result);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateLicenseStatusById(
    @Param('id') id: number,
    @Body() updateLicenseStatusDto: UpdateLicenseStatusDto,
  ) {
    const result = await this.licenseStatusesService.updateLicenseStatusById(
      id,
      updateLicenseStatusDto,
    );

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteLicenseStatusById(@Param('id') id: number) {
    await this.licenseStatusesService.deleteLicenseStatusById(id);

    return;
  }
}
