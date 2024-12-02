/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, HttpCode } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { UsuarioDto } from './usuario.dto/usuario.dto';

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}


    @Post()
    async createUsuario(@Body() usuarioDto: UsuarioDto): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
        return await this.usuarioService.crearUsuario(usuario);
    }

    @Get(':id')
    async findUsuarioById(@Param('id') id: string): Promise<UsuarioEntity> {
        return await this.usuarioService.findUsuarioById(id);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUsuario(@Param('id') id: string): Promise<void> {
        await this.usuarioService.eliminarUsuario(id);
    }
}