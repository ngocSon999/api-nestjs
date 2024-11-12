import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  Request,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../../middleware/jwt-auth.guard';

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
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    return req.user; // Thông tin người dùng sẽ được lấy từ đây
  }
}
