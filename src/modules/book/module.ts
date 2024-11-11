import { Module } from '@nestjs/common';
import { DatabaseMysqlModule } from '../../databases/mysql/module';
import { bookProviders } from './providers';
import { BookService } from './service';
import { BookController } from './controller';
import { AuthorModule } from '../author/module';

@Module({
  imports: [DatabaseMysqlModule, AuthorModule],
  providers: [...bookProviders, BookService],
  controllers: [BookController],
})
export class BookModule {}
