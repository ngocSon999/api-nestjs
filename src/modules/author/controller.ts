import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorService } from './service';
import { Author } from '../../databases/mysql/entity/author.entity';
import { JwtAuthGuard } from '../../middleware/jwt-auth.guard';
import { PermissionGuard } from '../../middleware/permission.guard';
import { Permissions } from '../../middleware/permission.decorator';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAuth() {
    return this.authorService.getAllAuthWithBooks();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard)
  @Permissions('author:create')
  create(@Body() authDto: Author) {
    return this.authorService.create(authDto);
  }
}
