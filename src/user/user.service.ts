import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { UserCreateDto } from './models/user-create.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new NotFoundException()
    return user
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username })
    if (!user) throw new NotFoundException()
    return user
  }

  async addUser(userDto: UserCreateDto): Promise<User> {
    const user = this.userRepository.create(userDto)
    await this.userRepository.save(user)
    return user
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.findOne(id)

    return this.userRepository.remove(user)
  }
}
