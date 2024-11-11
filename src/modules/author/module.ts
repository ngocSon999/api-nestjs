import { Module } from '@nestjs/common';
import { DatabaseMysqlModule } from '../../databases/mysql/module';
import { authProviders } from './providers';
import { AuthorService } from './service';
import { AuthorController } from './controller';
import { databaseProviders } from '../../databases/mysql/providers';

@Module({
  imports: [DatabaseMysqlModule],
  providers: [...authProviders, ...databaseProviders, AuthorService],
  controllers: [AuthorController],
  exports: [...authProviders, ...databaseProviders],
})
export class AuthorModule {}
