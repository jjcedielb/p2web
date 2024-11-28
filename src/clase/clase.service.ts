/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class ClaseService {
    constructor(
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>
    ) {}

    async crearClase(clase: ClaseEntity): Promise<ClaseEntity> {
        if (clase.codigo.length !== 10) {
            throw new BusinessLogicException(
                'El codigo de la clase deber tener mas de 10 caracterew',
                BusinessError.PRECONDITION_FAILED
            );
        }

        return await this.claseRepository.save(clase);
    }

    async findClaseById(id: string): Promise<ClaseEntity> {
        const clase = await this.claseRepository.findOne({ where: { id }, relations: ['usuario', 'bonos'] });

        if (!clase) {
            throw new BusinessLogicException(
                'La clase con el id dado no existe',
                BusinessError.NOT_FOUND
            );
        }

        return clase;
    }
}