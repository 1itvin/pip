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
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import HttpResponse from 'src/utils/http-response';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAllEmployees() {
    const result = await this.employeesService.getAllEmployees();

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getEmployeeById(@Param('id') id: number) {
    const result = await this.employeesService.getEmployeeById(id);

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    const result = await this.employeesService.createEmployee(
      createEmployeeDto,
    );

    return new HttpResponse(HttpStatus.CREATED, 'success', result);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateEmployeeById(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const result = await this.employeesService.updateEmployeeById(
      id,
      updateEmployeeDto,
    );

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEmployeeById(@Param('id') id: number) {
    await this.employeesService.deleteEmployeeById(id);

    return;
  }
}
