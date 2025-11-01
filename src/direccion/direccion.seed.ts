import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Direccion } from './entities/direccion.entity';

@Injectable()
export class DireccionSeed implements OnModuleInit {
  constructor(
    @InjectRepository(Direccion)
    private direccionRepository: Repository<Direccion>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    const count = await this.direccionRepository.count();

    // Solo insertar datos si la tabla está vacía
    if (count > 0) {
      console.log('La base de datos ya contiene direcciones. Seed omitido.');
      return;
    }

    console.log('Insertando 10 direcciones de ejemplo...');

    const direcciones = [
      {
        direccion_completa: 'Av. Javier Prado Este 123, San Isidro, Lima',
        referencia: 'Entre banco BCP y farmacia Inkafarma',
        latitud: -12.0956,
        longitud: -77.0362,
        cantidad_visitas: 15,
      },
      {
        direccion_completa: 'Calle Las Begonias 456, San Isidro, Lima',
        referencia: 'Frente al parque central',
        latitud: -12.0964,
        longitud: -77.0378,
        cantidad_visitas: 8,
      },
      {
        direccion_completa: 'Av. Arequipa 789, Miraflores, Lima',
        referencia: 'Al lado del centro comercial Larcomar',
        latitud: -12.1205,
        longitud: -77.0282,
        cantidad_visitas: 23,
      },
      {
        direccion_completa: 'Jr. de la Unión 234, Cercado de Lima, Lima',
        referencia: 'Cerca de la Plaza de Armas',
        latitud: -12.0464,
        longitud: -77.0428,
        cantidad_visitas: 42,
      },
      {
        direccion_completa: 'Av. La Marina 567, San Miguel, Lima',
        referencia: 'Frente al Plaza San Miguel',
        latitud: -12.0771,
        longitud: -77.0864,
        cantidad_visitas: 12,
      },
      {
        direccion_completa: 'Calle Schell 890, Miraflores, Lima',
        referencia: 'Entre óvalo Gutiérrez y parque Kennedy',
        latitud: -12.1216,
        longitud: -77.0301,
        cantidad_visitas: 31,
      },
      {
        direccion_completa: 'Av. Universitaria 345, Los Olivos, Lima',
        referencia: 'Al costado de la estación del Metropolitano',
        latitud: -11.9936,
        longitud: -77.0661,
        cantidad_visitas: 5,
      },
      {
        direccion_completa: 'Av. Aviación 678, San Borja, Lima',
        referencia: 'Cerca del hospital Rebagliati',
        latitud: -12.0925,
        longitud: -76.9959,
        cantidad_visitas: 19,
      },
      {
        direccion_completa: 'Calle Libertad 901, Barranco, Lima',
        referencia: 'Frente al Puente de los Suspiros',
        latitud: -12.1461,
        longitud: -77.0206,
        cantidad_visitas: 27,
      },
      {
        direccion_completa: 'Av. Brasil 1234, Breña, Lima',
        referencia: 'Entre plaza Bolognesi y la UNI',
        latitud: -12.0587,
        longitud: -77.0502,
        cantidad_visitas: 11,
      },
    ];

    for (const direccion of direcciones) {
      const nuevaDireccion = this.direccionRepository.create(direccion);
      await this.direccionRepository.save(nuevaDireccion);
    }

    console.log('✓ 10 direcciones insertadas exitosamente!');
  }
}
