import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, BonoEntity])],
  providers: [UsuarioService],
})
export class UsuarioModule {}