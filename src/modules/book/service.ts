import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from '../../databases/mysql/entity/book.entity';
import { Auth } from '../../databases/mysql/entity/auth.entity';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: Repository<Book>,
    @Inject('AUTH_REPOSITORY') private authRepository: Repository<Auth>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: ['auth'],
    });
  }
  async create(book: Book): Promise<Book> {
    const auth = await this.authRepository.findOne({
      where: { id: book.authId },
    });

    if (!auth) {
      throw new HttpException('Auth not found', HttpStatus.BAD_REQUEST);
    }

    try {
      const newBook = this.bookRepository.create(book);
      return await this.bookRepository.save(newBook);
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Name already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'An error occurred while creating the book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
