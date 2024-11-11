import { IsNotEmpty } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Prop({ required: true })
  slug: string;
}
