import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entity/category.entity';
import { CategoryService } from './service';
import { User, UserSchema } from '../user/entity/user.entity';
import { CategoryController } from "./controller";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Category.name, schema: CategorySchema }],
      'categories',
    ),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'users',
    ),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
