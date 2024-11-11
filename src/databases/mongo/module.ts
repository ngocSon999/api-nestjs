import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        connectionFactory: (connection: Connection) => {
          if (connection.readyState === 1) {
            console.log('🎯 users mongo connected successfully!');
          }
          connection.on('disconnected', () => {
            console.log('users mongo disconnected!');
          });
          connection.on('reconnected', () => {
            console.log('users mongo reconnected!\n');
          });
          connection.on('error', () => {
            console.log('MongoUsersConnection');
          });

          return connection;
        },
      }),
      connectionName: 'users', // Đưa connectionName ra ngoài useFactory
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        connectionFactory: (connection: Connection) => {
          if (connection.readyState === 1) {
            console.log('🎯 categories mongo connected successfully!');
          }
          connection.on('disconnected', () => {
            console.log('categories mongo disconnected!');
          });
          connection.on('reconnected', () => {
            console.log('categories mongo reconnected!\n');
          });
          connection.on('error', () => {
            console.log('MongoCategoriesConnection');
          });

          return connection;
        },
      }),
      connectionName: 'categories',
    }),
  ],
})
export class MongoDatabaseModule {}
