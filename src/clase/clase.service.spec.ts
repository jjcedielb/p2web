import { Test, TestingModule } from '@nestjs/testing';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity/clase.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';

describe('ClaseService', () => {
  let service: ClaseService;
  let claseRepository: Repository<ClaseEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaseService,
        {
          provide: getRepositoryToken(ClaseEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClaseService>(ClaseService);
    claseRepository = module.get<Repository<ClaseEntity>>(getRepositoryToken(ClaseEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crearClase', () => {
    it('should create a Clase (positive case)', async () => {
      const mockClase: ClaseEntity = {
        id: '1',
        nombre: 'Matemáticas',
        codigo: '1234567890',
        numeroCreditos: 3,
        bonos: [],
        usuario: new UsuarioEntity
      };

      jest.spyOn(claseRepository, 'save').mockResolvedValue(mockClase);

      const result = await service.crearClase(mockClase);
      expect(result).toEqual(mockClase);
    });

    it('should throw an exception if codigo is not 10 characters long (negative case)', async () => {
      const mockClase: ClaseEntity = {
        id: '1',
        nombre: 'Matemáticas',
        codigo: '123456789',
        numeroCreditos: 3,
        bonos: [],
        usuario: new UsuarioEntity
      };

      await expect(service.crearClase(mockClase)).rejects.toThrow(
        new BusinessLogicException(
          'El codigo de la clase deber tener mas de 10 caracterew',
          BusinessError.PRECONDITION_FAILED,
        ),
      );
    });
  });

  describe('findClaseById', () => {
    it('should return a Clase by its ID (positive case)', async () => {
      const mockClase: ClaseEntity = {
        id: '1',
        nombre: 'Matemáticas',
        codigo: '1234567890',
        numeroCreditos: 3,
        bonos: [],
        usuario: new UsuarioEntity
      };

      jest.spyOn(claseRepository, 'findOne').mockResolvedValue(mockClase);

      const result = await service.findClaseById('1');
      expect(result).toEqual(mockClase);
    });

    it('should throw an exception if Clase is not found (negative case)', async () => {
      jest.spyOn(claseRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findClaseById('1')).rejects.toThrow(
        new BusinessLogicException(
          'La clase con el id dado no existe',
          BusinessError.NOT_FOUND,
        ),
      );
    });
  });

  describe('findAllClases', () => {
    it('should return all Clases (positive case)', async () => {
      const mockClases: ClaseEntity[] = [
        {
          id: '1',
          nombre: 'Matemáticas',
          codigo: '1234567890',
          numeroCreditos: 3,
          bonos: [],
          usuario: new UsuarioEntity
        },
        {
          id: '2',
          nombre: 'Física',
          codigo: '0987654321',
          numeroCreditos: 4,
          bonos: [],
          usuario: new UsuarioEntity
        },
      ];

      jest.spyOn(claseRepository, 'find').mockResolvedValue(mockClases);

      const result = await service.findAllClases();
      expect(result).toEqual(mockClases);
    });

    it('should return an empty array if no Clases are found (positive case)', async () => {
      jest.spyOn(claseRepository, 'find').mockResolvedValue([]);

      const result = await service.findAllClases();
      expect(result).toEqual([]);
    });
  });
});