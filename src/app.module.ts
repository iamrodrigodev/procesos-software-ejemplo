import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Direccion } from './direccion/entities/direccion.entity';
import { DireccionModule } from './direccion/direccion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Direccion],
      synchronize: true,
    }),
    DireccionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
