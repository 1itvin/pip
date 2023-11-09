import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable({})
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany({ include: { role: true } });
  }

  async getUserById(id: number): Promise<User> {
    return this.prismaService.user.findFirst({
      where: { id },
      include: { role: true },
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: user,
      include: { role: true },
    });
  }

  async updateUserById(id: number, user: UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: user,
      include: { role: true },
    });
  }

  async deleteUserById(id: number): Promise<User> {
    return this.prismaService.user.delete({
      where: { id },
      include: { role: true },
    });
  }
}
