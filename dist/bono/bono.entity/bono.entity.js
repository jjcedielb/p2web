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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonoEntity = void 0;
const clase_entity_1 = require("../../clase/clase.entity/clase.entity");
const usuario_entity_1 = require("../../usuario/usuario.entity/usuario.entity");
const typeorm_1 = require("typeorm");
let BonoEntity = class BonoEntity {
};
exports.BonoEntity = BonoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BonoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BonoEntity.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0 }),
    __metadata("design:type", Number)
], BonoEntity.prototype, "calificacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BonoEntity.prototype, "palabraClave", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.UsuarioEntity, usuario => usuario.bonos),
    __metadata("design:type", usuario_entity_1.UsuarioEntity)
], BonoEntity.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clase_entity_1.ClaseEntity, clase => clase.bonos),
    __metadata("design:type", clase_entity_1.ClaseEntity)
], BonoEntity.prototype, "clase", void 0);
exports.BonoEntity = BonoEntity = __decorate([
    (0, typeorm_1.Entity)()
], BonoEntity);
//# sourceMappingURL=bono.entity.js.map