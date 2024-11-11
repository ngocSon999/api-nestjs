import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Author } from '../../databases/mysql/entity/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private authRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.authRepository.find();
  }
  async getAuthWithBooks(authorId: number): Promise<Author> {
    return await this.authRepository.findOne({
      where: { id: authorId },
      relations: ['books'], // Liên kết với books
    });
  }
  async getAllAuthWithBooks(): Promise<Author[]> {
    return await this.authRepository.find({
      relations: ['books'], // Liên kết với bảng books
    });
  }
  async create(authorDto: Author): Promise<Author> {
    try {
      const newAuth = this.authRepository.create(authorDto);
      return await this.authRepository.save(newAuth);
    } catch (error: any) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new HttpException('name already exists', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
