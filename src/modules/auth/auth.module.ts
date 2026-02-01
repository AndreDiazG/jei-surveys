import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserOrmEntity } from './infraestructure/persistence/entities/user.orm-entity';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './infraestructure/controllers/auth.controller';
import { JwtStrategy } from './infraestructure/strategies/jwt.strategy';
import { UserSeederService } from './application/services/user-seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'secretKey',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserSeederService],
  exports: [TypeOrmModule],
})
export class AuthModule {}
