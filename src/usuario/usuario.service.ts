/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,

        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>
    ) {}


    async crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if (usuario.rol === 'Profesor') {
            const validGroups = ['TICSW', 'IMAGINE', 'COMIT'];
            if (!validGroups.includes(usuario.grupoInvestigacion)) {
                throw new BusinessLogicException(
                    'Grupo de investigacion invalido',
                    BusinessError.PRECONDITION_FAILED
                );
            }
        } else if (usuario.rol === 'Decana') {
            if (usuario.numeroExtension.toString().length !== 8) {
                throw new BusinessLogicException(
                    'El numero de extension debe ser mayor a 8 digitos',
                    BusinessError.PRECONDITION_FAILED
                );
            }
        }
        return await this.usuarioRepository.save(usuario);
    }


    async findUsuarioById(id: string): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },
            relations: ['bonos', 'clases', 'jefe'],
        });

        if (!usuario) {
            throw new BusinessLogicException(
                'No existe un usuario para el id dado',
                BusinessError.NOT_FOUND
            );
        }

        return usuario;
    }

    async eliminarUsuario(id: string): Promise<void> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },
            relations: ['bonos'],
        });

        if (!usuario) {
            throw new BusinessLogicException(
                'No se encontro un usuario con el id dado',
                BusinessError.NOT_FOUND
            );
        }

        if (usuario.rol === 'Decana') {
            throw new BusinessLogicException(
                'EL usuario tiene rol de decana, por lo tanto no se puede eliminar',
                BusinessError.PRECONDITION_FAILED
            );
        }

        if (usuario.bonos.length > 0) {
            throw new BusinessLogicException(
                'El usuario tiene un bono asociado',
                BusinessError.PRECONDITION_FAILED
            );
        }

        await this.usuarioRepository.remove(usuario);
    }
}