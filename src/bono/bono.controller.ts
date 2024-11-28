/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { BonoDto } from './bono.dto/bono.dto';
import { BonoEntity } from './bono.entity/bono.entity';
import { BonoService } from './bono.service';

@Controller('bonos')
@UseInterceptors(BusinessErrorsInterceptor)
export class BonoController {
    constructor(private readonly bonoService: BonoService) {}

    @Post(':userId')
    async createBono(@Param('userId') userId: string, @Body() bonoDto: BonoDto) {
        const bono: BonoEntity = plainToInstance(BonoEntity, bonoDto);
        return await this.bonoService.crearBono(bono, userId);
    }

    @Get(':bonoId')
    async findBonoByCodigo(@Param('bonoId') bonoId: string) {
        return await this.bonoService.findBonoByCodigo(bonoId);
    }

    @Get('usuario/:userId')
    async findAllBonosByUsuario(@Param('userId') userId: string) {
        return await this.bonoService.findAllBonosByUsuario(userId);
    }

    @Delete(':bonoId')
    @HttpCode(204)
    async deleteBono(@Param('bonoId') bonoId: string) {
        await this.bonoService.deleteBono(bonoId);
    }
}