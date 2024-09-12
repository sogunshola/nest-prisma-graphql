import { PrismaService } from './../prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: env.jwtSecret,
    });
  }

  async validate(payload: any) {
    const { sub } = payload;
    const user = await this.prisma.user.findUnique({ where: { id: sub } });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
