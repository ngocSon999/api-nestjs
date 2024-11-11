import { Module } from '@nestjs/common';
import { DatabaseMysqlModule } from '../../databases/mysql/module';
import { authProviders } from './providers';
import { AuthService } from './service';
import { AuthController } from './controller';
import { databaseProviders } from '../../databases/mysql/providers';

@Module({
  imports: [DatabaseMysqlModule],
  providers: [...authProviders, ...databaseProviders, AuthService],
  controllers: [AuthController],
  exports: [...authProviders, ...databaseProviders],
})
export class AuthModule {}
