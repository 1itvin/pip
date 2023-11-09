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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import HttpResponse from 'src/utils/http-response';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAllRoles() {
    const result = await this.rolesService.getAllRoles();

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getRoleById(@Param('id') id: number) {
    const result = await this.rolesService.getRoleById(id);

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const result = await this.rolesService.createRole(createRoleDto);

    return new HttpResponse(HttpStatus.CREATED, 'success', result);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateRoleById(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const result = await this.rolesService.updateRoleById(id, updateRoleDto);

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRoleById(@Param('id') id: number) {
    await this.rolesService.deleteRoleById(id);

    return;
  }
}
