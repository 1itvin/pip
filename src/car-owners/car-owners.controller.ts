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
import { CarOwnersService } from './car-owners.service';
import { CreateCarOwnerDto } from './dto/create-car-owner.dto';
import { UpdateCarOwnerDto } from './dto/update-car-owner.dto';
import HttpResponse from 'src/utils/http-response';

@Controller('car-owners')
export class CarOwnersController {
  constructor(private carOwnersService: CarOwnersService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAllCarOwners() {
    const result = await this.carOwnersService.getAllCarOwners();

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getCarOwnerById(@Param('id') id: number) {
    const result = await this.carOwnersService.getCarOwnerById(id);

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createCarOwner(@Body() createCarOwnerDto: CreateCarOwnerDto) {
    const result = await this.carOwnersService.createCarOwner(
      createCarOwnerDto,
    );

    return new HttpResponse(HttpStatus.CREATED, 'success', result);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateCarOwnerById(
    @Param('id') id: number,
    @Body() updateCarOwnerDto: UpdateCarOwnerDto,
  ) {
    const result = await this.carOwnersService.updateCarOwnerById(
      id,
      updateCarOwnerDto,
    );

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCarOwnerById(@Param('id') id: number) {
    await this.carOwnersService.deleteCarOwnerById(id);

    return;
  }
}
