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
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity/usuario.entity");
const bono_entity_1 = require("../bono/bono.entity/bono.entity");
const business_errors_1 = require("../shared/errors/business-errors");
let UsuarioService = class UsuarioService {
    constructor(usuarioRepository, bonoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.bonoRepository = bonoRepository;
    }
    async crearUsuario(usuario) {
        if (usuario.rol === 'Profesor') {
            const validGroups = ['TICSW', 'IMAGINE', 'COMIT'];
            if (!validGroups.includes(usuario.grupoInvestigacion)) {
                throw new business_errors_1.BusinessLogicException('Grupo de investigacion invalido', business_errors_1.BusinessError.PRECONDITION_FAILED);
            }
        }
        else if (usuario.rol === 'Decana') {
            if (usuario.numeroExtension.toString().length !== 8) {
                throw new business_errors_1.BusinessLogicException('El numero de extension debe ser mayor a 8 digitos', business_errors_1.BusinessError.PRECONDITION_FAILED);
            }
        }
        return await this.usuarioRepository.save(usuario);
    }
    async findUsuarioById(id) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },
            relations: ['bonos', 'clases', 'jefe'],
        });
        if (!usuario) {
            throw new business_errors_1.BusinessLogicException('No existe un usuario para el id dado', business_errors_1.BusinessError.NOT_FOUND);
        }
        return usuario;
    }
    async eliminarUsuario(id) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },
            relations: ['bonos'],
        });
        if (!usuario) {
            throw new business_errors_1.BusinessLogicException('No se encontro un usuario con el id dado', business_errors_1.BusinessError.NOT_FOUND);
        }
        if (usuario.rol === 'Decana') {
            throw new business_errors_1.BusinessLogicException('EL usuario tiene rol de decana, por lo tanto no se puede eliminar', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        if (usuario.bonos.length > 0) {
            throw new business_errors_1.BusinessLogicException('El usuario tiene un bono asociado', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        await this.usuarioRepository.remove(usuario);
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.UsuarioEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(bono_entity_1.BonoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map