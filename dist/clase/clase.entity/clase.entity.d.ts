import { BonoEntity } from '../../bono/bono.entity/bono.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
export declare class ClaseEntity {
    id: string;
    nombre: string;
    codigo: string;
    numeroCreditos: number;
    usuario: UsuarioEntity;
    bonos: BonoEntity[];
}
