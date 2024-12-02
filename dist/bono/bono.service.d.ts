import { Repository } from 'typeorm';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
export declare class BonoService {
    private readonly bonoRepository;
    private readonly usuarioRepository;
    private readonly claseRepository;
    constructor(bonoRepository: Repository<BonoEntity>, usuarioRepository: Repository<UsuarioEntity>, claseRepository: Repository<ClaseEntity>);
    crearBono(bono: BonoEntity, userId: string): Promise<BonoEntity>;
    findBonoByCodigo(id: string): Promise<BonoEntity>;
    findAllBonosByClaseCodigo(codigoClase: string): Promise<BonoEntity[]>;
    findAllBonosByUsuario(userId: string): Promise<BonoEntity[]>;
    deleteBono(id: string): Promise<void>;
}
