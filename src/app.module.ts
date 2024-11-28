import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ClaseModule } from './clase/clase.module';
import { BonoService } from './bono/bono.service';
import { BonoController } from './bono/bono.controller';

@Module({
  imports: [UsuarioModule, ClaseModule],
  controllers: [AppController, BonoController],
  providers: [AppService, BonoService],
})
export class AppModule {}
