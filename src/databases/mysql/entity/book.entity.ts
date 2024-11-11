import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Author } from './author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, unique: true })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'name is required' })
  @Column('int')
  authorId: number;

  @Column('text')
  description: string;

  @IsNotEmpty({ message: 'price is required' })
  @Column('int')
  price: number;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
