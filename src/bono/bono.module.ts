import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity/bono.entity';
import { BonoService } from './bono.service';
import { BonoController } from './bono.controller';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity'; 

@Module({
    imports: [
        TypeOrmModule.forFeature([BonoEntity, UsuarioEntity]), 
    ],
    providers: [BonoService], 
    controllers: [BonoController], 
    exports: [BonoService], 
})
export class BonoModule {}