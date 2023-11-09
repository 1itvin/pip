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
import { OffensesService } from './offense.service';
import { CreateOffenseDto } from './dto/create-offense.dto';
import { UpdateOffenseDto } from './dto/update-offense.dto';
import HttpResponse from 'src/utils/http-response';

@Controller('offenses')
export class OffensesController {
  constructor(private offensesService: OffensesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAllOffenses() {
    const result = await this.offensesService.getAllOffenses();

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOffenseById(@Param('id') id: number) {
    const result = await this.offensesService.getOffenseById(id);

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createOffense(@Body() createOffenseDto: CreateOffenseDto) {
    const result = await this.offensesService.createOffense(createOffenseDto);

    return new HttpResponse(HttpStatus.CREATED, 'success', result);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateOffenseById(
    @Param('id') id: number,
    @Body() updateOffenseDto: UpdateOffenseDto,
  ) {
    const result = await this.offensesService.updateOffenseById(
      id,
      updateOffenseDto,
    );

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOffenseById(@Param('id') id: number) {
    await this.offensesService.deleteOffenseById(id);

    return;
  }
}
