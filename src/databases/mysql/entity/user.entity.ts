import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Name is required' })
  @Column({ length: 50 })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @Column({ length: 150, unique: true })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @Column({ length: 32 })
  password: string;

  @Column({ nullable: true })
  refreshToken: string;
  @Column({ nullable: true })
  verify_token: string;
  @Column({ nullable: true, type: 'json' })
  permissions: any;
}
