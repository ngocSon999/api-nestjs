import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from '../../databases/mysql/entity/book.entity';
import { Author } from '../../databases/mysql/entity/author.entity';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: Repository<Book>,
    @Inject('AUTHOR_REPOSITORY') private authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: ['author'],
    });
  }
  async create(book: Book): Promise<Book> {
    const author = await this.authorRepository.findOne({
      where: { id: book.authorId },
    });

    if (!author) {
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
