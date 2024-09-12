import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Helper } from '../../shared/utils';
import { UsersService } from '../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    // compare the password with the one stored in the database
    if (user && (await Helper.compare(password, user.password))) {
      return this.login(user);
    }
    throw new BadRequestException('Invalid credentials');
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateBiometric(email: string, biometricKey: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    // compare the biometric key with the one stored in the database
    if (user && (await Helper.compare(biometricKey, user.biometricKey))) {
      return this.login(user);
    }
    throw new BadRequestException('Invalid biometric data');
  }
}
