import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  Res,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = loginUserDto;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { access_token } = await this.authService.login(user);
    response.cookie('jwt', access_token, { httpOnly: true });
    return { message: 'Login successfully' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logged out successfully' };
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("user")
  async getProfile(@Req() req) {
    return { user: req.user }; 
  }
}
