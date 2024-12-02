import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity/clase.entity';
import { ClaseDto } from './clase.dto/clase.dto';
export declare class ClaseController {
    private readonly claseService;
    constructor(claseService: ClaseService);
    createClase(claseDto: ClaseDto): Promise<ClaseEntity>;
    findClaseById(id: string): Promise<ClaseEntity>;
    findAllClases(): Promise<ClaseEntity[]>;
}
