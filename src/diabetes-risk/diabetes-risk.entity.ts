// diabetes-risk.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/entities/user.entity'; // Asegúrate de que la entidad User esté importada correctamente

@Entity()
export class DiabetesRisk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  activity: string;

  @Column()
  risk: string;

  @ManyToOne(() => User, (user) => user.diabetesRisks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  // Nueva columna que registra la fecha y hora de la creación
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // Este campo se llenará automáticamente con la fecha y hora actuales
}
