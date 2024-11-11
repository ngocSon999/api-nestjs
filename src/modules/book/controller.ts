import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from './service';
import { Book } from '../../databases/mysql/entity/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBook() {
    return this.bookService.findAll();
  }
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() book: Book) {
    return this.bookService.create(book);
  }
}
