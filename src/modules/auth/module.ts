import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AuthController } from './controller';
import { UsersModule } from '../users/module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../middleware/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PassportModule, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
