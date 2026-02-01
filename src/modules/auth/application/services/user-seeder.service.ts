import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../../infraestructure/persistence/entities/user.orm-entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  async seedUsers() {
    const count = await this.userRepository.count();
    if (count > 0) return;

    console.log('🌱 Seeding default users...');

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('123456', salt);

    const admin = this.userRepository.create({
      email: 'admin@test.com',
      passwordHash: password,
      name: 'Admin User',
      role: 'admin',
    });

    const creator = this.userRepository.create({
      email: 'user@test.com',
      passwordHash: password,
      name: 'Creator User',
      role: 'creator',
    });

    await this.userRepository.save([admin, creator]);
    console.log('Users created: admin@test.com / user@test.com (Pass: 123456)');
  }
}
