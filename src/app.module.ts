import { Module } from '@nestjs/common';
import { MongoDatabaseModule } from './databases/mongo/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { UserModule } from './modules/user/module';
import { CategoryModule } from './modules/category/module';
import { BookModule } from './modules/book/module';
import { DatabaseMysqlModule } from './databases/mysql/module';
import { AuthorModule } from './modules/author/module';
import { UsersModule } from './modules/users/module';
import { AuthModule } from './modules/auth/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: true,
      load: [configuration],
    }),
    MongoDatabaseModule,
    DatabaseMysqlModule,
    UserModule,
    UsersModule,
    CategoryModule,
    BookModule,
    AuthorModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
