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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const business_errors_interceptor_1 = require("../shared/interceptors/business-errors.interceptor");
const usuario_service_1 = require("./usuario.service");
const usuario_entity_1 = require("./usuario.entity/usuario.entity");
const usuario_dto_1 = require("./usuario.dto/usuario.dto");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    async createUsuario(usuarioDto) {
        const usuario = (0, class_transformer_1.plainToInstance)(usuario_entity_1.UsuarioEntity, usuarioDto);
        return await this.usuarioService.crearUsuario(usuario);
    }
    async findUsuarioById(id) {
        return await this.usuarioService.findUsuarioById(id);
    }
    async deleteUsuario(id) {
        await this.usuarioService.eliminarUsuario(id);
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_dto_1.UsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "createUsuario", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findUsuarioById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "deleteUsuario", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, common_1.Controller)('usuarios'),
    (0, common_1.UseInterceptors)(business_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map