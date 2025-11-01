import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
