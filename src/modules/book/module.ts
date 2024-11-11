import { Module } from '@nestjs/common';
import { DatabaseMysqlModule } from '../../databases/mysql/module';
import { bookProviders } from './providers';
import { BookService } from './service';
import { BookController } from './controller';
import { AuthModule } from '../auth/module';

@Module({
  imports: [DatabaseMysqlModule, AuthModule],
  providers: [...bookProviders, BookService],
  controllers: [BookController],
})
export class BookModule {}
