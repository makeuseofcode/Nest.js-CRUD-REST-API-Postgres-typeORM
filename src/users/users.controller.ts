import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.entity';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  // Create user
  @Post()
  @HttpCode(201) // Set the HTTP status code to 201 (Created)
  async create(@Body() user: User): Promise<User> {
    const createdUser = await this.usersService.create(user);
    return createdUser;
  }

  // Update user
  @Put(':id')
  async update (@Param('id') id: number, @Body() user: User): Promise<any> {
    await this.usersService.update(id, user);
    return { message: 'User updated successfully' };
  }
  // Delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    await this.usersService.delete(id);
    return { message: 'User deleted successfully' };
  }
}
