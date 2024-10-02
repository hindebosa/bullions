import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './types/user';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const userInDB = await this.prisma.user.findUnique({
        where: { email: userData.email },
      });
      if (userInDB) {
        throw new Error('User already exists');
      }

      const user = await this.prisma.user.create({ data: userData });

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
