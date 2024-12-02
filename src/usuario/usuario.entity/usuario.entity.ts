import { BonoEntity } from '../../bono/bono.entity/bono.entity';
import { ClaseEntity } from '../../clase/clase.entity/clase.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   cedula: number;

   @Column()
   nombre: string;

   @Column()
   grupoInvestigacion: string;

   @Column()
   numeroExtension: number;

   @Column()
   rol: string; 

   @OneToOne(() => UsuarioEntity)
   @JoinColumn()
   jefe: UsuarioEntity;

   @OneToMany(() => BonoEntity, bono => bono.usuario)
   bonos: BonoEntity[];

   @OneToMany(() => ClaseEntity, clase => clase.usuario)
   clases: ClaseEntity[];
}