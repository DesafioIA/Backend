import { Repository } from 'typeorm';
import { DiabetesRisk } from './diabetes-risk.entity';
import { Injectable } from '@nestjs/common';

@Injectable()  // Ensure it is injectable
export class DiabetesRiskRepository extends Repository<DiabetesRisk> {
  // Custom methods here
}
