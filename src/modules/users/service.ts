import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../databases/mysql/entity/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async create(userDto: UserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(userDto);
      return await this.userRepository.save(newUser);
    } catch (error: any) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new HttpException('name already exists', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
