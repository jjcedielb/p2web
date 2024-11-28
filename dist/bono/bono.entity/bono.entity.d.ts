import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
export declare class BonoEntity {
    id: string;
    monto: number;
    calificacion: number;
    palabraClave: string;
    usuario: UsuarioEntity;
    clase: ClaseEntity;
}
