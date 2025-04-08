// src/diabetes-risk/diabetes-risk.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiabetesRisk } from './diabetes-risk.entity';
import { DiabetesRiskController } from './diabetes-risk.controller';
import { DiabetesRiskService } from './diabetes-risk.service';
import { UsersModule } from '../users/users.module';  // Asegúrate de usar el nombre correcto
import { DiabetesRiskRepository } from './diabetes-risk.repository'; // Verifica que esta importación sea correcta
import { User } from '../users/entities/user.entity';  // Importa el User entity

@Module({
  imports: [
    TypeOrmModule.forFeature([DiabetesRisk, DiabetesRiskRepository, User]), // Asegúrate de que DiabetesRisk esté aquí
    UsersModule
  ],
  controllers: [DiabetesRiskController],
  providers: [DiabetesRiskService],
  exports: [DiabetesRiskService],  // Si necesitas exportar el servicio a otros módulos

})
export class DiabetesRiskModule {}
