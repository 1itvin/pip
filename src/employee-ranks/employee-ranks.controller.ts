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
import { EmployeeRanksService } from './employee-ranks.service';
import { CreateEmployeeRankDto } from './dto/create-employee-rank.dto';
import { UpdateEmployeeRankDto } from './dto/update-employee-rank.dto';
import HttpResponse from 'src/utils/http-response';

@Controller('employee-ranks')
export class EmployeeRanksController {
  constructor(private employeeRanksService: EmployeeRanksService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAllEmployeeRanks() {
    const result = await this.employeeRanksService.getAllEmployeeRanks();

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getEmployeeRankById(@Param('id') id: number) {
    const result = await this.employeeRanksService.getEmployeeRankById(id);

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createEmployeeRank(
    @Body() createEmployeeRankDto: CreateEmployeeRankDto,
  ) {
    const result = await this.employeeRanksService.createEmployeeRank(
      createEmployeeRankDto,
    );

    return new HttpResponse(HttpStatus.CREATED, 'success', result);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateEmployeeRankById(
    @Param('id') id: number,
    @Body() updateEmployeeRankDto: UpdateEmployeeRankDto,
  ) {
    const result = await this.employeeRanksService.updateEmployeeRankById(
      id,
      updateEmployeeRankDto,
    );

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEmployeeRankById(@Param('id') id: number) {
    await this.employeeRanksService.deleteEmployeeRankById(id);

    return;
  }
}
