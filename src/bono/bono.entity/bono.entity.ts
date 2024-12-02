import { ClaseEntity } from '../../clase/clase.entity/clase.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BonoEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   monto: number;

   @Column('float', { default: 0 })
   calificacion: number;

   @Column()
   palabraClave: string;

   @ManyToOne(() => UsuarioEntity, usuario => usuario.bonos)
   usuario: UsuarioEntity;

   @ManyToOne(() => ClaseEntity, clase => clase.bonos)
   clase: ClaseEntity;
}