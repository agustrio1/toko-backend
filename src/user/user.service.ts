import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private adminEmails: string[];

  constructor(private prisma: PrismaService) {
    this.adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  }

  async getAllUsers(): Promise<any[]> {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...rest }) => rest);
  }

  async getUserById(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async createUser(createUserDto: CreateUserDTO): Promise<any> {
    const { email, username, name, password } = createUserDto;

    // Check if the user with the given email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = this.determineRoleByEmail(email);

    // Now you can use the determined role and hashed password to create the user in the database
    const createdUser = await this.prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role,
        name,
      },
    });

    // Remove the hashed password from the response for security reasons
    const { password: _, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDTO): Promise<any> {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(userId: string): Promise<any> {
    const deletedUser = await this.prisma.user.delete({
      where: { id: userId },
    });

    const { password, ...userWithoutPassword } = deletedUser;
    return userWithoutPassword;
  }

  async validatePassword(userId: string, password: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    return isPasswordValid;
  }

  private determineRoleByEmail(email: string): string {
    return this.adminEmails.includes(email) ? 'admin' : 'user';
  }
}
