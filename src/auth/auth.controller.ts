import { Controller, Get, UseGuards, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.json({
        'message': 'Authrorized',
        'JWT Token': jwt,
      });
    } else {
      throw new UnauthorizedException();
    }
  }
}
