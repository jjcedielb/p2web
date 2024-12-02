import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { BonoModule } from './bono/bono.module';
import { ClaseModule } from './clase/clase.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'idw',
            database: 'clases',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        UsuarioModule,
        BonoModule,
        ClaseModule,
    ],
})
export class AppModule {}