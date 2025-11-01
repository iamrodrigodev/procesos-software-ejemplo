import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { Direccion } from './entities/direccion.entity';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Controller('direccion')
export class DireccionController {
  constructor(private readonly direccionService: DireccionService) {}

  @Post()
  create(@Body() createDireccionDto: CreateDireccionDto): Promise<Direccion> {
    return this.direccionService.create(createDireccionDto);
  }

  @Get()
  findAll(): Promise<Direccion[]> {
    return this.direccionService.findAll();
  }

  @Get('autocomplete')
  autocomplete(@Query('parcial') parcial: string): Promise<Direccion[]> {
    return this.direccionService.autocomplete(parcial);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Direccion> {
    return this.direccionService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDireccionDto: UpdateDireccionDto,
  ): Promise<Direccion> {
    return this.direccionService.update(+id, updateDireccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.direccionService.remove(+id);
  }
}
