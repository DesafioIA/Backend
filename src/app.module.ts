import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DiabetesRiskModule } from './diabetes-risk/diabetes-risk.module';
import { DiabetesRisk } from './diabetes-risk/diabetes-risk.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CatsModule,
    BreedsModule,
    UsersModule,
    AuthModule,
    DiabetesRiskModule,
    DiabetesRisk,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
