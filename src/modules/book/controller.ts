import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from './service';
import { Book } from '../../databases/mysql/entity/book.entity';
import { JwtAuthGuard } from '../../middleware/jwt-auth.guard';

@Controller('book')
@UseGuards(JwtAuthGuard)
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
