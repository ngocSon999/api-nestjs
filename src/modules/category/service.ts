import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category';
import { Category } from './entity/category.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name, 'categories')
    private categoryModel: Model<Category>,
  ) {}
  list(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const createdCategory =
        await this.categoryModel.create(createCategoryDto);
      return createdCategory.save();
    } catch (error: any) {
      if (error?.errorResponse?.code === 11000) {
        throw new HttpException('name already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        error?.errorResponse?.errmsg,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
