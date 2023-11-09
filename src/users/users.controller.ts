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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import HttpResponse from 'src/utils/http-response';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    const result = await this.usersService.getAllUsers();

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: number) {
    const result = await this.usersService.getUserById(id);

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.createUser(createUserDto);

    return new HttpResponse(HttpStatus.CREATED, 'success', result);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.usersService.updateUserById(id, updateUserDto);

    return new HttpResponse(HttpStatus.OK, 'success', result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id') id: number) {
    await this.usersService.deleteUserById(id);

    return;
  }
}
