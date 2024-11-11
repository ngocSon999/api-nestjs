import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './service';
import { CreateUserDto } from './dto/create-user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
