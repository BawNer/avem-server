import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupsController } from "./groups.controller";
import { GroupsEntity } from "./groups.entity";
import { GroupsService } from "./groups.service";

@Module({
  imports: [TypeOrmModule.forFeature([GroupsEntity])],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule {}