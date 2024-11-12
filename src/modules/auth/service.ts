import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user[0] || user[0].password != pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user[0].refreshToken) {
      await this.userService.deleteRefreshToken(user[0].id);
    }
    // Create JWT payload
    const payload = {
      email: user[0].email,
      sub: user[0].id,
    };
    // Generate access token
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
    // Generate refresh token (with a longer expiration time)
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // refresh token valid for 7 days
    });
    // Store the refresh token in the database
    const data = {
      verify_token: accessToken,
      refreshToken: refreshToken,
    };
    await this.userService.updateToken(user[0].id, data);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // Method to refresh access token using refresh token
  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Find the user by the payload sub (userId)
      const user = await this.userService.findOne(payload.email);
      if (!user[0]) {
        throw new UnauthorizedException('User not found');
      }

      // Generate a new access token
      const newAccessToken = this.generateAccessToken({
        email: user[0].email,
        sub: user[0].id,
      });
      const data = {
        verify_token: newAccessToken,
      };
      await this.userService.updateToken(user[0].id, data);
      return {
        access_token: newAccessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }
  async deleteRefreshToken(userId: number): Promise<void> {
    await this.userService.deleteRefreshToken(userId);
  }
}
