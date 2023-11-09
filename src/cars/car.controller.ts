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
import { CarsService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import HttpResponse from 'src/utils/http-response';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAllCars() {
    const result = await this.carsService.getAllCars();

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getCarById(@Param('id') id: number) {
    const result = await this.carsService.getCarById(id);

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createCarOwner(@Body() createCarDto: CreateCarDto) {
    const result = await this.carsService.createCar(createCarDto);

    return new HttpResponse(HttpStatus.CREATED, 'success', result);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateCarById(
    @Param('id') id: number,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    const result = await this.carsService.updateCarById(id, updateCarDto);

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCarById(@Param('id') id: number) {
    await this.carsService.deleteCarById(id);

    return;
  }
}
