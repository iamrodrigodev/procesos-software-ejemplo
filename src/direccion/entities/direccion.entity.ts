import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('direccion')
export class Direccion {
  @PrimaryGeneratedColumn()
  id_direccion: number;

  @Column({ type: 'text' })
  direccion_completa: string;

  @Column({ type: 'text', nullable: true })
  referencia: string;

  @Column({ type: 'real' })
  latitud: number;

  @Column({ type: 'real' })
  longitud: number;

  @Column({ type: 'integer', default: 0 })
  cantidad_visitas: number;

  @CreateDateColumn({ type: 'datetime' })
  fecha_registro: Date;
}
