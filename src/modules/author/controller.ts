import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorService } from './service';
import { Author } from '../../databases/mysql/entity/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAuth() {
    return this.authorService.getAllAuthWithBooks();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() authDto: Author) {
    return this.authorService.create(authDto);
  }
}
