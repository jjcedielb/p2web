import { Repository } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
export declare class UsuarioService {
    private readonly usuarioRepository;
    private readonly bonoRepository;
    constructor(usuarioRepository: Repository<UsuarioEntity>, bonoRepository: Repository<BonoEntity>);
    crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>;
    findUsuarioById(id: string): Promise<UsuarioEntity>;
    eliminarUsuario(id: string): Promise<void>;
}