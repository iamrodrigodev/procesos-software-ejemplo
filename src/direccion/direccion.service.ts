import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Direccion } from './entities/direccion.entity';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Injectable()
export class DireccionService {
  constructor(
    @InjectRepository(Direccion)
    private direccionRepository: Repository<Direccion>,
  ) {}

  async create(createDireccionDto: CreateDireccionDto): Promise<Direccion> {
    const direccion = this.direccionRepository.create(createDireccionDto);
    return this.direccionRepository.save(direccion);
  }

  async findAll(): Promise<Direccion[]> {
    return this.direccionRepository.find();
  }

  async findOne(id: number): Promise<Direccion> {
    const direccion = await this.direccionRepository.findOne({
      where: { id_direccion: id },
    });

    if (!direccion) {
      throw new NotFoundException(`Dirección con ID ${id} no fue encontrada`);
    }

    return direccion;
  }

  async update(
    id: number,
    updateDireccionDto: UpdateDireccionDto,
  ): Promise<Direccion> {
    await this.direccionRepository.update(id, updateDireccionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.direccionRepository.delete(id);
  }

  async autocomplete(parcial: string): Promise<Direccion[]> {
    if (!parcial || parcial.trim().length === 0) {
      return [];
    }

    return this.direccionRepository
      .createQueryBuilder('direccion')
      .where('direccion.direccion_completa LIKE :parcial', {
        parcial: `%${parcial}%`,
      })
      .limit(10)
      .getMany();
  }
}
