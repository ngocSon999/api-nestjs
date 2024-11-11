import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './service';
import { Auth } from '../../databases/mysql/entity/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAllAuthWithBooks();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() authDto: Auth) {
    return this.authService.create(authDto);
  }
}
