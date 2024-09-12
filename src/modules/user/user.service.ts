import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserInput } from './dto/user.dto';
import { Helper } from '../../shared/utils';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private async checkUniqueEmail(email: string) {
    // check if the email already exists
    const user = await this.findByEmail(email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
  }

  async create(data: RegisterUserInput) {
    await this.checkUniqueEmail(data.email);
    // hash the password before saving it to the database
    const hashedPassword = await Helper.hash(data.password);
    let bioMetricKey = null;
    if (data.bioMetricKey) {
      bioMetricKey = await Helper.hash(data.bioMetricKey);
    }
    return this.prisma.user.create({
      data: {
        email: data.email,
        biometricKey: bioMetricKey,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
