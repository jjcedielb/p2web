/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class BonoService {
    constructor(
        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async crearBono(bono: BonoEntity, userId: string): Promise<BonoEntity> {
        if (!bono.monto || bono.monto <= 0) {
            throw new BusinessLogicException(
                'El monto del bono debe ser positivo',
                BusinessError.PRECONDITION_FAILED
            );
        }

        const usuario = await this.usuarioRepository.findOne({ where: { id: userId } });

        if (!usuario) {
            throw new BusinessLogicException(
                'No se encontro el usuario con el id dado',
                BusinessError.NOT_FOUND
            );
        }

        if (usuario.rol !== 'Profesor') {
            throw new BusinessLogicException(
                'Los bonos pueden ser asignados unicamente a usuarios con el rol de docente',
                BusinessError.PRECONDITION_FAILED
            );
        }

        bono.usuario = usuario;
        return await this.bonoRepository.save(bono);
    }


    async findBonoByCodigo(id: string): Promise<BonoEntity> {
        const bono = await this.bonoRepository.findOne({ where: { id }, relations: ['usuario', 'clase'] });

        if (!bono) {
            throw new BusinessLogicException(
                'El bono con el id dado no existe',
                BusinessError.NOT_FOUND
            );
        }

        return bono;
    }


    async findAllBonosByUsuario(userId: string): Promise<BonoEntity[]> {
        const usuario = await this.usuarioRepository.findOne({ where: { id: userId }, relations: ['bonos'] });

        if (!usuario) {
            throw new BusinessLogicException(
                'El id del ususario dado no existe',
                BusinessError.NOT_FOUND
            );
        }

        return usuario.bonos;
    }

    async deleteBono(id: string): Promise<void> {
        const bono = await this.bonoRepository.findOne({ where: { id } });

        if (!bono) {
            throw new BusinessLogicException(
                'El id del bono dado no existe',
                BusinessError.NOT_FOUND
            );
        }

        if (bono.calificacion > 4) {
            throw new BusinessLogicException(
                'Este bono tiene una calificacion mayor a 4, por lo tanto no podra ser eliminado',
                BusinessError.PRECONDITION_FAILED
            );
        }

        await this.bonoRepository.remove(bono);
    }
}