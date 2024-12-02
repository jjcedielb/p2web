import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { UsuarioDto } from './usuario.dto/usuario.dto';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    createUsuario(usuarioDto: UsuarioDto): Promise<UsuarioEntity>;
    findUsuarioById(id: string): Promise<UsuarioEntity>;
    deleteUsuario(id: string): Promise<void>;
}
