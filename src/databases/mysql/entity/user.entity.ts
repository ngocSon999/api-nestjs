import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Name is required' })
  @Column({ length: 500, unique: true })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @Column({ length: 32, unique: true })
  email: string;

  @IsNotEmpty({ message: 'Name is required' })
  @Column({ length: 32 })
  password: string;
}
