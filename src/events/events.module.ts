import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsEntity } from '@app/events/events.entity';
import { EventsController } from '@app/events/events.controller';
import { EventService } from '@app/events/event.service';
import { Module } from '@nestjs/common';
import { AudienceEntity } from '@app/audience/audience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventsEntity, AudienceEntity])],
  controllers: [EventsController],
  providers: [EventService],
  exports: [EventService],
})
export class EventsModule {}
