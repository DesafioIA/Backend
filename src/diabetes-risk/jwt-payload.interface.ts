// jwt-payload.interface.ts
export interface JwtPayload {
    userId: string;  // Agregar 'userId' aquí
    email: string;
    role: string;
    iat: number;
    exp: number;
  }
  