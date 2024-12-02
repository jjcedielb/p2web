import { Repository } from 'typeorm';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
export declare class ClaseService {
    private readonly claseRepository;
    constructor(claseRepository: Repository<ClaseEntity>);
    crearClase(clase: ClaseEntity): Promise<ClaseEntity>;
    findClaseById(id: string): Promise<ClaseEntity>;
    findAllClases(): Promise<ClaseEntity[]>;
}
