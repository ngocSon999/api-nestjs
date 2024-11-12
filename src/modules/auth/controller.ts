import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './service';
import { JwtAuthGuard } from '../../middleware/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;
    return this.authService.refreshAccessToken(refreshToken);
  }
  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() request: any): Promise<void> {
    const userId = request.user?.userId;
    await this.authService.deleteRefreshToken(userId);
  }
}
