import { Repository } from 'typeorm';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
export declare class BonoService {
    private readonly bonoRepository;
    private readonly usuarioRepository;
    constructor(bonoRepository: Repository<BonoEntity>, usuarioRepository: Repository<UsuarioEntity>);
    crearBono(bono: BonoEntity, userId: string): Promise<BonoEntity>;
    findBonoByCodigo(id: string): Promise<BonoEntity>;
    findAllBonosByUsuario(userId: string): Promise<BonoEntity[]>;
    deleteBono(id: string): Promise<void>;
}
