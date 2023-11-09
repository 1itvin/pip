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
  Query,
} from '@nestjs/common';
import { EmployeeOffensesService } from './employee-offenses.service';
import { CreateEmployeeOffenseDto } from './dto/create-employee-offenses.dto';
import { UpdateEmployeeOffenseDto } from './dto/update-employee-offenses.dto';
import HttpResponse from 'src/utils/http-response';

@Controller('employee-offenses')
export class EmployeeOffensesController {
  constructor(private employeeOffensesService: EmployeeOffensesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAllEmployeeOffenses(
    @Query('employeeId') employeeId: number,
    @Query('offenseId') offenseId: number,
  ) {
    const result = await this.employeeOffensesService.getAllEmployeeOffenses({
      employeeId,
      offenseId,
    });

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getEmployeeOffenseById(@Param('id') id: number) {
    const result = await this.employeeOffensesService.getEmployeeOffenseById(
      id,
    );

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createEmployeeOffense(
    @Body() createEmployeeOffenseDto: CreateEmployeeOffenseDto,
  ) {
    const result = await this.employeeOffensesService.createEmployeeOffense(
      createEmployeeOffenseDto,
    );

    return new HttpResponse(HttpStatus.CREATED, 'success', result);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateEmployeeOffenseById(
    @Param('id') id: number,
    @Body() updateEmployeeOffenseDto: UpdateEmployeeOffenseDto,
  ) {
    const result = await this.employeeOffensesService.updateEmployeeOffenseById(
      id,
      updateEmployeeOffenseDto,
    );

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEmployeeOffenseById(@Param('id') id: number) {
    await this.employeeOffensesService.deleteEmployeeOffenseById(id);

    return;
  }
}
