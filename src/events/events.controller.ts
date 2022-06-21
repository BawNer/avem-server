import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventService } from '@app/events/event.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { EventsEntity } from '@app/events/events.entity';
import { CreateEventDto } from '@app/events/dto/createEvent.dto';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import { UpdateEventDto } from '@app/events/dto/updateEvent.dto';
import { DeleteResult } from 'typeorm';
import { EventsResponseInterface } from '@app/events/types/eventsResponse.interface';
import { EventResponseInterface } from '@app/events/types/eventResponse.interface';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventService) {}

  @Get()
  async findAll(@Query() query: any): Promise<EventsResponseInterface> {
    return await this.eventsService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createEvent(
    @Body('event') createEventDto: CreateEventDto,
    @User() author: UserEntity,
  ): Promise<EventResponseInterface> {
    return await this.eventsService.createEvent(createEventDto, author);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateEvent(
    @Body('event') updateEventDto: UpdateEventDto,
    @Param('id') eventId: number,
  ): Promise<EventResponseInterface> {
    return await this.eventsService.updateEvent(updateEventDto, eventId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteEvent(@Param('id') id: number): Promise<DeleteResult> {
    return await this.eventsService.deleteEvent(id);
  }
}
