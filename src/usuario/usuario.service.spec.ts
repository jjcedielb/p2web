import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let usuarioRepository: Repository<UsuarioEntity>;
  let bonoRepository: Repository<BonoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(UsuarioEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(BonoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    bonoRepository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crearUsuario', () => {
    it('should create a Usuario with role Profesor (positive case)', async () => {
      const mockUsuario: UsuarioEntity = {
        id: '1',
        rol: 'Profesor',
        nombre: 'Test Profesor',
        cedula: 12345,
        grupoInvestigacion: 'TICSW',
        numeroExtension: 12345678,
        jefe: null,
        bonos: [],
        clases: [],
      };

      jest.spyOn(usuarioRepository, 'save').mockResolvedValue(mockUsuario);

      const result = await service.crearUsuario(mockUsuario);
      expect(result).toEqual(mockUsuario);
    });

    it('should throw an exception for invalid grupoInvestigacion for Profesor (negative case)', async () => {
      const mockUsuario: UsuarioEntity = {
        id: '1',
        rol: 'Profesor',
        nombre: 'Test Profesor',
        cedula: 12345,
        grupoInvestigacion: 'INVALID_GROUP',
        numeroExtension: 12345678,
        jefe: null,
        bonos: [],
        clases: [],
      };

      await expect(service.crearUsuario(mockUsuario)).rejects.toThrow(
        new BusinessLogicException(
          'Grupo de investigacion invalido',
          BusinessError.PRECONDITION_FAILED,
        ),
      );
    });

    it('should throw an exception for invalid numeroExtension for Decana (negative case)', async () => {
      const mockUsuario: UsuarioEntity = {
        id: '1',
        rol: 'Decana',
        nombre: 'Test Decana',
        cedula: 12345,
        grupoInvestigacion: null,
        numeroExtension: 123,
        jefe: null,
        bonos: [],
        clases: [],
      };

      await expect(service.crearUsuario(mockUsuario)).rejects.toThrow(
        new BusinessLogicException(
          'El numero de extension debe ser mayor a 8 digitos',
          BusinessError.PRECONDITION_FAILED,
        ),
      );
    });
  });

  describe('findUsuarioById', () => {
    it('should return a Usuario by ID (positive case)', async () => {
      const mockUsuario: UsuarioEntity = {
        id: '1',
        rol: 'Profesor',
        nombre: 'Test Profesor',
        cedula: 12345,
        grupoInvestigacion: 'TICSW',
        numeroExtension: 12345678,
        jefe: null,
        bonos: [],
        clases: [],
      };

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(mockUsuario);

      const result = await service.findUsuarioById('1');
      expect(result).toEqual(mockUsuario);
    });

    it('should throw an exception if Usuario is not found (negative case)', async () => {
      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findUsuarioById('1')).rejects.toThrow(
        new BusinessLogicException(
          'No existe un usuario para el id dado',
          BusinessError.NOT_FOUND,
        ),
      );
    });
  });

  describe('eliminarUsuario', () => {
    it('should delete a Usuario without bonos and not Decana (positive case)', async () => {
      const mockUsuario: UsuarioEntity = {
        id: '1',
        rol: 'Profesor',
        nombre: 'Test Profesor',
        cedula: 12345,
        grupoInvestigacion: 'TICSW',
        numeroExtension: 12345678,
        jefe: null,
        bonos: [],
        clases: [],
      };

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(mockUsuario);
      jest.spyOn(usuarioRepository, 'remove').mockResolvedValue(undefined);

      await expect(service.eliminarUsuario('1')).resolves.toBeUndefined();
    });

    it('should throw an exception if Usuario is a Decana (negative case)', async () => {
      const mockUsuario: UsuarioEntity = {
        id: '1',
        rol: 'Decana',
        nombre: 'Test Decana',
        cedula: 12345,
        grupoInvestigacion: null,
        numeroExtension: 12345678,
        jefe: null,
        bonos: [],
        clases: [],
      };

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(mockUsuario);

      await expect(service.eliminarUsuario('1')).rejects.toThrow(
        new BusinessLogicException(
          'EL usuario tiene rol de decana, por lo tanto no se puede eliminar',
          BusinessError.PRECONDITION_FAILED,
        ),
      );
    });

    it('should throw an exception if Usuario has associated bonos (negative case)', async () => {
      const mockUsuario: UsuarioEntity = {
        id: '1',
        rol: 'Profesor',
        nombre: 'Test Profesor',
        cedula: 12345,
        grupoInvestigacion: 'TICSW',
        numeroExtension: 12345678,
        jefe: null,
        bonos: [{ id: '2', monto: 1000, calificacion: 4.5, palabraClave: 'viaje', clase: null, usuario: null }],
        clases: [],
      };

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(mockUsuario);

      await expect(service.eliminarUsuario('1')).rejects.toThrow(
        new BusinessLogicException(
          'El usuario tiene un bono asociado',
          BusinessError.PRECONDITION_FAILED,
        ),
      );
    });
  });
});