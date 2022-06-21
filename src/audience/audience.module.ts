import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudienceEntity } from '@app/audience/audience.entity';
import { AudienceController } from '@app/audience/audience.controller';
import { AudienceService } from '@app/audience/audience.service';

@Module({
  imports: [TypeOrmModule.forFeature([AudienceEntity])],
  controllers: [AudienceController],
  providers: [AudienceService],
  exports: [AudienceService],
})
export class AudienceModule {}
