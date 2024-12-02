"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bono_entity_1 = require("../bono/bono.entity/bono.entity");
const usuario_entity_1 = require("../usuario/usuario.entity/usuario.entity");
const business_errors_1 = require("../shared/errors/business-errors");
const clase_entity_1 = require("../clase/clase.entity/clase.entity");
let BonoService = class BonoService {
    constructor(bonoRepository, usuarioRepository, claseRepository) {
        this.bonoRepository = bonoRepository;
        this.usuarioRepository = usuarioRepository;
        this.claseRepository = claseRepository;
    }
    async crearBono(bono, userId) {
        if (!bono.monto || bono.monto <= 0) {
            throw new business_errors_1.BusinessLogicException('El monto del bono debe ser positivo', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        const usuario = await this.usuarioRepository.findOne({ where: { id: userId } });
        if (!usuario) {
            throw new business_errors_1.BusinessLogicException('No se encontro el usuario con el id dado', business_errors_1.BusinessError.NOT_FOUND);
        }
        if (usuario.rol !== 'Profesor') {
            throw new business_errors_1.BusinessLogicException('Los bonos pueden ser asignados unicamente a usuarios con el rol de docente', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        bono.usuario = usuario;
        return await this.bonoRepository.save(bono);
    }
    async findBonoByCodigo(id) {
        const bono = await this.bonoRepository.findOne({ where: { id }, relations: ['usuario', 'clase'] });
        if (!bono) {
            throw new business_errors_1.BusinessLogicException('El bono con el id dado no existe', business_errors_1.BusinessError.NOT_FOUND);
        }
        return bono;
    }
    async findAllBonosByClaseCodigo(codigoClase) {
        const clase = await this.claseRepository.findOne({ where: { codigo: codigoClase }, relations: ['bonos'] });
        if (!clase) {
            throw new business_errors_1.BusinessLogicException('La clase con el código dado no existe', business_errors_1.BusinessError.NOT_FOUND);
        }
        return clase.bonos;
    }
    async findAllBonosByUsuario(userId) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: userId }, relations: ['bonos'] });
        if (!usuario) {
            throw new business_errors_1.BusinessLogicException('El id del ususario dado no existe', business_errors_1.BusinessError.NOT_FOUND);
        }
        return usuario.bonos;
    }
    async deleteBono(id) {
        const bono = await this.bonoRepository.findOne({ where: { id } });
        if (!bono) {
            throw new business_errors_1.BusinessLogicException('El id del bono dado no existe', business_errors_1.BusinessError.NOT_FOUND);
        }
        if (bono.calificacion > 4) {
            throw new business_errors_1.BusinessLogicException('Este bono tiene una calificacion mayor a 4, por lo tanto no podra ser eliminado', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        await this.bonoRepository.remove(bono);
    }
};
exports.BonoService = BonoService;
exports.BonoService = BonoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bono_entity_1.BonoEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.UsuarioEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(clase_entity_1.ClaseEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BonoService);
//# sourceMappingURL=bono.service.js.map