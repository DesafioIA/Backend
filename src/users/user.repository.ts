import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()  // Marca la clase como inyectable en el sistema de dependencias de NestJS
export class UserRepository {
  constructor(
    @InjectRepository(User)  // Inyecta el repositorio de User
    private userRepository: Repository<User>,
  ) {}

  // Puedes agregar métodos personalizados aquí si es necesario
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });  // Usa el objeto con la propiedad "where"
  }

  // Otros métodos según tus necesidades
}
