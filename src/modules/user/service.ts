import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user';
import { User } from './entity/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, 'users') private userModel: Model<User>,
  ) {}
  getUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.userModel.create(createUserDto);
      return createdUser.save();
    } catch (error: any) {
      if (error?.errorResponse?.code === 11000) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
