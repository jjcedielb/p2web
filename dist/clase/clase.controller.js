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
exports.ClaseController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const business_errors_interceptor_1 = require("../shared/interceptors/business-errors.interceptor");
const clase_service_1 = require("./clase.service");
const clase_entity_1 = require("./clase.entity/clase.entity");
const clase_dto_1 = require("./clase.dto/clase.dto");
let ClaseController = class ClaseController {
    constructor(claseService) {
        this.claseService = claseService;
    }
    async createClase(claseDto) {
        const clase = (0, class_transformer_1.plainToInstance)(clase_entity_1.ClaseEntity, claseDto);
        return await this.claseService.crearClase(clase);
    }
    async findClaseById(id) {
        return await this.claseService.findClaseById(id);
    }
    async findAllClases() {
        return await this.claseService.findAllClases();
    }
};
exports.ClaseController = ClaseController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [clase_dto_1.ClaseDto]),
    __metadata("design:returntype", Promise)
], ClaseController.prototype, "createClase", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClaseController.prototype, "findClaseById", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClaseController.prototype, "findAllClases", null);
exports.ClaseController = ClaseController = __decorate([
    (0, common_1.Controller)('clases'),
    (0, common_1.UseInterceptors)(business_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [clase_service_1.ClaseService])
], ClaseController);
//# sourceMappingURL=clase.controller.js.map