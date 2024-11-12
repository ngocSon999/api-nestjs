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
      console.log(newUser);
      return await this.userRepository.save(newUser);
    } catch (error: any) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }
  }
  async findOne(email: string): Promise<User[]> {
    return this.userRepository.find({
      where: { email: email },
    });
  }
  // Cập nhật refreshToken vào bảng User
  async updateToken(
    userId: number,
    data: { [key: string]: string },
  ): Promise<void> {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        await this.userRepository.update(userId, { [key]: data[key] });
      }
    }
  }
  async deleteRefreshToken(userId: number): Promise<void> {
    await this.userRepository.update(userId, {
      refreshToken: null,
      verify_token: null,
    });
  }
}
