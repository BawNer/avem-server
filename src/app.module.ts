import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormconfig from './ormconfig'
import { RoleModule } from './roles/role.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
