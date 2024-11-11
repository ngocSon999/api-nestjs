import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from 'typeorm';
import { Auth } from '../../databases/mysql/entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<Auth>,
  ) {}

  async findAll(): Promise<Auth[]> {
    return this.authRepository.find();
  }
  async getAuthWithBooks(authId: number): Promise<Auth> {
    return await this.authRepository.findOne({
      where: { id: authId },
      relations: ['books'], // Liên kết với books
    });
  }
  async getAllAuthWithBooks(): Promise<Auth[]> {
    return await this.authRepository.find({
      relations: ['books'], // Liên kết với bảng books
    });
  }
  async create(authDto: Auth): Promise<Auth> {
    try {
      const newAuth = this.authRepository.create(authDto);
      return await this.authRepository.save(newAuth);
    } catch (error: any) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new HttpException('name already exists', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
