import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  get() {
    return this.userService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }
}
