import { Injectable, ConflictException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Method to create a user
  async create(dto: CreateUserDto): Promise<User> {
    const { email, password, username } = dto;

    // Check if the email already exists
    const emailExists = await this.mailExists(email);
    if (emailExists) {
      throw new ConflictException('Email already in use');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    // Save the user
    const newUser = await this.usersRepository.save(user);

    return newUser;
  }

  // Method to find a user by email
  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.usersRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password', 'username'], // Select password explicitly
      });
    } catch (error) {
      console.error(`Error finding user by email: ${email}`, error);
      return null;
    }
  }

  //  Method to validate if email exists
  async mailExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return !!user;
  }

  // Method to find a user by ID
  async findUserById(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }
}
