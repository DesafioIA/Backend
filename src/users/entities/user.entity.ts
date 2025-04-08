import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../../common/enums/rol.enum';
import { DiabetesRisk } from '../../diabetes-risk/diabetes-risk.entity';  // Importa la entidad DiabetesRisk

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => DiabetesRisk, (diabetesRisk) => diabetesRisk.user)
  diabetesRisks: DiabetesRisk[]; // Relación uno a muchos con DiabetesRisk

}
