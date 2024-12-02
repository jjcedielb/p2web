"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const clase_entity_1 = require("./clase.entity/clase.entity");
const clase_service_1 = require("./clase.service");
const clase_controller_1 = require("./clase.controller");
let ClaseModule = class ClaseModule {
};
exports.ClaseModule = ClaseModule;
exports.ClaseModule = ClaseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([clase_entity_1.ClaseEntity])],
        controllers: [clase_controller_1.ClaseController],
        providers: [clase_service_1.ClaseService],
    })
], ClaseModule);
//# sourceMappingURL=clase.module.js.map