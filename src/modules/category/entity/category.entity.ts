import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  collection: 'categories',
  autoIndex: true,
  autoCreate: true,
  timestamps: true,
})
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ name: 1 }, { unique: true });
