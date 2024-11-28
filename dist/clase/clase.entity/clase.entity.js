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
exports.ClaseEntity = void 0;
const bono_entity_1 = require("../../bono/bono.entity/bono.entity");
const usuario_entity_1 = require("../../usuario/usuario.entity/usuario.entity");
const typeorm_1 = require("typeorm");
let ClaseEntity = class ClaseEntity {
};
exports.ClaseEntity = ClaseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClaseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClaseEntity.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClaseEntity.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ClaseEntity.prototype, "numeroCreditos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.UsuarioEntity, usuario => usuario.clases),
    __metadata("design:type", usuario_entity_1.UsuarioEntity)
], ClaseEntity.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bono_entity_1.BonoEntity, bono => bono.clase),
    __metadata("design:type", Array)
], ClaseEntity.prototype, "bonos", void 0);
exports.ClaseEntity = ClaseEntity = __decorate([
    (0, typeorm_1.Entity)()
], ClaseEntity);
//# sourceMappingURL=clase.entity.js.map