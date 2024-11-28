"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bono_entity_1 = require("./bono.entity/bono.entity");
const bono_service_1 = require("./bono.service");
const bono_controller_1 = require("./bono.controller");
const usuario_entity_1 = require("../usuario/usuario.entity/usuario.entity");
let BonoModule = class BonoModule {
};
exports.BonoModule = BonoModule;
exports.BonoModule = BonoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([bono_entity_1.BonoEntity, usuario_entity_1.UsuarioEntity]),
        ],
        providers: [bono_service_1.BonoService],
        controllers: [bono_controller_1.BonoController],
        exports: [bono_service_1.BonoService],
    })
], BonoModule);
//# sourceMappingURL=bono.module.js.map