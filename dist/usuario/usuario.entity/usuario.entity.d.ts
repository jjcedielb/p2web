import { BonoEntity } from '../../bono/bono.entity/bono.entity';
import { ClaseEntity } from '../../clase/clase.entity/clase.entity';
export declare class UsuarioEntity {
    id: string;
    cedula: number;
    nombre: string;
    grupoInvestigacion: string;
    numeroExtension: number;
    rol: string;
    jefe: UsuarioEntity;
    bonos: BonoEntity[];
    clases: ClaseEntity[];
}
