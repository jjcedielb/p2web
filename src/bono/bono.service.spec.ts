import { Test, TestingModule } from '@nestjs/testing';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity/bono.entity';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

describe('BonoService', () => {
  let service: BonoService;
  let bonoRepository: Repository<BonoEntity>;
  let usuarioRepository: Repository<UsuarioEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BonoService,
        {
          provide: getRepositoryToken(BonoEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UsuarioEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BonoService>(BonoService);
    bonoRepository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crearBono', () => {
    it('should create a Bono (positive case)', async () => {
      const mockClase: ClaseEntity = {
        id: '1',
        nombre: 'Matemáticas',
        codigo: '1234567890',
        numeroCreditos: 3,
        bonos: [],
        usuario: new UsuarioEntity(),
      };

      const mockUsuario: UsuarioEntity = {
        id: '1',
        rol: 'Profesor',
        nombre: 'Test User',
        cedula: 12345,
        grupoInvestigacion: 'TICSW',
        numeroExtension: 12345678,
        jefe: null,
        bonos: [],
        clases: [],
      };

      const mockBono: BonoEntity = {
        id: '1',
        monto: 1000,
        calificacion: 4.5,
        palabraClave: 'viaje',
        usuario: mockUsuario,
        clase: mockClase,
      };

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(mockUsuario);
      jest.spyOn(bonoRepository, 'save').mockResolvedValue(mockBono);

      const result = await service.crearBono(mockBono, mockUsuario.id);
      expect(result).toEqual(mockBono);
    });

    it('should throw an exception if monto is negative (negative case)', async () => {
      const mockUsuario: UsuarioEntity = {
        id: '1',
        rol: 'Profesor',
        nombre: 'Test User',
        cedula: 12345,
        grupoInvestigacion: 'TICSW',
        numeroExtension: 12345678,
        jefe: null,
        bonos: [],
        clases: [],
      };

      const mockBono: BonoEntity = {
        id: '1',
        monto: -100,
        calificacion: 4.5,
        palabraClave: 'viaje',
        usuario: mockUsuario,
        clase: null,
      };

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(mockUsuario);

      await expect(service.crearBono(mockBono, mockUsuario.id)).rejects.toThrow(
        new BusinessLogicException('El monto del bono debe ser positivo', BusinessError.PRECONDITION_FAILED),
      );
    });
  });

  describe('findBonoByCodigo', () => {
    it('should return a Bono by its ID (positive case)', async () => {
      const mockBono: BonoEntity = {
        id: '1',
        monto: 1000,
        calificacion: 4.5,
        palabraClave: 'viaje',
        usuario: null,
        clase: null,
      };

      jest.spyOn(bonoRepository, 'findOne').mockResolvedValue(mockBono);

      const result = await service.findBonoByCodigo('1');
      expect(result).toEqual(mockBono);
    });

    it('should throw an exception if Bono is not found (negative case)', async () => {
      jest.spyOn(bonoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findBonoByCodigo('1')).rejects.toThrow(
        new BusinessLogicException('El bono con el id dado no existe', BusinessError.NOT_FOUND),
      );
    });
  });

  describe('findAllBonosByUsuario', () => {
    it('should return all Bonos for a given Usuario (positive case)', async () => {
        const mockUsuario: UsuarioEntity = {
            id: '1',
            rol: 'Profesor',
            nombre: 'Test User',
            cedula: 12345,
            grupoInvestigacion: 'TICSW',
            numeroExtension: 12345678,
            jefe: null,
            bonos: [], 
            clases: [],
        };

        const mockBonos: BonoEntity[] = [
            {
                id: '1',
                monto: 1000,
                calificacion: 4.5,
                palabraClave: 'viaje',
                usuario: mockUsuario,
                clase: null,
            },
            {
                id: '2',
                monto: 2000,
                calificacion: 3.8,
                palabraClave: 'investigación',
                usuario: mockUsuario,
                clase: null,
            },
        ];

        mockUsuario.bonos = mockBonos;

        jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(mockUsuario);

        const result = await service.findAllBonosByUsuario(mockUsuario.id);
        expect(result).toEqual(mockBonos);
    });
  });
});