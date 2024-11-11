import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Book } from './book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Name is required' })
  @Column({ length: 500, unique: true })
  name: string;

  @MaxLength(500)
  @Column('text')
  description: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
