import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DiabetesRiskModule } from '../diabetes-risk/diabetes-risk.module';  // Si DiabetesRisk usa UserRepository, importa el módulo
import { UserRepository } from './user.repository';  // Asegúrate de importar el repositorio si es necesario

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Asegúrate de que el repositorio de User esté importado
  providers: [UserRepository, UsersService], // Proporciona el repositorio
  exports: [UserRepository, UsersService],   
  controllers: [UsersController],
})
export class UsersModule {}
