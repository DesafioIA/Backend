import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity'; // Asegúrate de que la entidad User esté importada correctamente
import { DiabetesRisk } from './diabetes-risk.entity'; // Lo mismo con la entidad DiabetesRisk
import { JwtPayload } from './jwt-payload.interface'; // Asegúrate de tener la interfaz para el JWT

@Injectable()
export class DiabetesRiskService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(DiabetesRisk)
    private diabetesRiskRepository: Repository<DiabetesRisk>,
  ) {}

  async saveRiskData(decodedToken: JwtPayload, riskData: any) {
    // Obtén el correo electrónico del token decodificado
    const { email } = decodedToken;

    // Busca el usuario por correo electrónico en la base de datos
    const user = await this.userRepository.findOne({ where: { email } });

    // Si no se encuentra el usuario, lanza un error
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const userId = user.id; // Obtén el ID del usuario

    // Ahora guarda los datos del riesgo de diabetes utilizando el ID del usuario
    const { age, weight, height, activity, risk } = riskData; // Extraemos los datos relevantes

    const newRiskData = this.diabetesRiskRepository.create({
      userId, // Asignamos el userId que obtenemos del JWT
      age,     // Pasamos los datos del riesgo sin el userId desde el frontend
      weight,
      height,
      activity,
      risk,
    });

    await this.diabetesRiskRepository.save(newRiskData);
    return newRiskData;
  }


  async getRiskData(decodedToken: JwtPayload) {
    const { email } = decodedToken; // Obtener el email del token

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Buscar los datos de riesgo de diabetes del usuario
    const riskData = await this.diabetesRiskRepository.find({ where: { userId: user.id } });

    if (!riskData || riskData.length === 0) {
      throw new Error('No se encontraron datos de riesgo de diabetes para este usuario');
    }

    return riskData; // Retorna los datos de riesgo de diabetes
  }
}
