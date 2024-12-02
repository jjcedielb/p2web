import { BonoDto } from './bono.dto/bono.dto';
import { BonoEntity } from './bono.entity/bono.entity';
import { BonoService } from './bono.service';
export declare class BonoController {
    private readonly bonoService;
    constructor(bonoService: BonoService);
    createBono(userId: string, bonoDto: BonoDto): Promise<BonoEntity>;
    findBonoByCodigo(bonoId: string): Promise<BonoEntity>;
    findAllBonosByUsuario(userId: string): Promise<BonoEntity[]>;
    findBonosByClaseCodigo(codigoClase: string): Promise<BonoEntity[]>;
    deleteBono(bonoId: string): Promise<void>;
}
