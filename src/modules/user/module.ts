import { Module } from '@nestjs/common';
import { UserController } from './controller';
import { UserService } from './service';
import { User, UserSchema } from './entity/user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'users',
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
