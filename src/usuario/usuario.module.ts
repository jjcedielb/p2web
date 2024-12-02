import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { UsuarioController } from './usuario.controller';


@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, BonoEntity])],
  providers: [UsuarioService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}