import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import { User } from '../entities/user.entity'
import { UserCreateDto } from './models/user-create.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userSerice: UserService) {}
  @Get()
  async listUsers(): Promise<User[]> {
    console.log('here')
    return this.userSerice.findAll()
  }

  @Post()
  async createUser(@Body() userDto: UserCreateDto): Promise<User> {
    return this.userSerice.addUser(userDto)
  }

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userSerice.findOne(id)
  }

  @Delete(':id')
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userSerice.deleteUser(id)
  }
}
