import { Controller, Get, Post, Param, Body, UseInterceptors, HttpCode } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity/clase.entity';
import { ClaseDto } from './clase.dto/clase.dto';

@Controller('clases')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClaseController {
    constructor(private readonly claseService: ClaseService) {}

    @Post()
    async createClase(@Body() claseDto: ClaseDto): Promise<ClaseEntity> {
        const clase: ClaseEntity = plainToInstance(ClaseEntity, claseDto);
        return await this.claseService.crearClase(clase);
    }


    @Get(':id')
    async findClaseById(@Param('id') id: string): Promise<ClaseEntity> {
        return await this.claseService.findClaseById(id);
    }

    @Get()
    async findAllClases(): Promise<ClaseEntity[]> {
        return await this.claseService.findAllClases();
    }
    
}