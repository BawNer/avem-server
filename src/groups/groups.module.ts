import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupsController } from "./groups.controller";
import { GroupsEntity } from "./groups.entity";

@Module({
  imports: [TypeOrmModule.forFeature([GroupsEntity])],
  controllers: [GroupsController],
  providers: [GroupsModule]
})
export class GroupsModule {}