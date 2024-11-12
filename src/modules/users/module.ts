import { Module } from '@nestjs/common';
import { DatabaseMysqlModule } from '../../databases/mysql/module';
import { userProviders } from './providers';
import { UserService } from './service';
import { UserController } from './controller';
import { databaseProviders } from '../../databases/mysql/providers';

@Module({
  imports: [DatabaseMysqlModule],
  providers: [...userProviders, ...databaseProviders, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
