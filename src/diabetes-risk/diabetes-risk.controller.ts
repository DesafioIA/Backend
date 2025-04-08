import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';
import { DiabetesRiskService } from './diabetes-risk.service';
import { JwtPayload } from './jwt-payload.interface'; // La interfaz con la carga útil del JWT
import { Request } from 'express'; // Para acceder al request y obtener el token
import { User } from '../users/entities/user.entity'; // Asegúrate de importar la entidad User

@Controller('diabetes-risk')
export class DiabetesRiskController {
  constructor(private readonly diabetesRiskService: DiabetesRiskService) {}

  @Post()
  async saveRiskData(@Req() req: Request, @Body() riskData: any) {
    const token = req.headers.authorization?.split(' ')[1]; // Suponiendo que el token viene en el header como "Bearer token"
    
    if (!token) {
      throw new Error('No token provided'); // Lanzar error si no se proporciona token
    }

    try {
      // Decodificar el token para obtener el contenido de la carga útil (payload)
      const decodedToken = jwtDecode<JwtPayload>(token); // Decodifica el token usando jwt-decode

      // Usar la información del token decodificado para proceder con la lógica del servicio
      return this.diabetesRiskService.saveRiskData(decodedToken, riskData);
    } catch (error) {
      // Manejar error si la decodificación falla (token inválido)
      throw new Error('Invalid token');
    }
  }

  // Nuevo endpoint para obtener la información del usuario
  @Get('user')
  async getRiskData(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1]; // Obtener el token desde el header
    
    if (!token) {
      throw new Error('No token provided'); // Si no se proporciona token
    }

    try {
      // Decodificar el token para obtener la carga útil (payload)
      const decodedToken = jwtDecode<JwtPayload>(token);

      // Usar la información decodificada (como el email) para obtener los datos del usuario
      return this.diabetesRiskService.getRiskData(decodedToken);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
