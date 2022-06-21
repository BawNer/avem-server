import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsEntity } from '@app/events/events.entity';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { CreateEventDto } from '@app/events/dto/createEvent.dto';
import { UserEntity } from '@app/user/user.entity';
import { UpdateEventDto } from '@app/events/dto/updateEvent.dto';
import { EventsResponseInterface } from '@app/events/types/eventsResponse.interface';
import { EventResponseInterface } from '@app/events/types/eventResponse.interface';
import { AudienceEntity } from '@app/audience/audience.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventsEntity)
    private readonly eventsRepository: Repository<EventsEntity>,
    @InjectRepository(AudienceEntity)
    private readonly audienceRepository: Repository<AudienceEntity>,
  ) {}

  async findAll(query: any): Promise<EventsResponseInterface> {
    const queryBuilder = getRepository(EventsEntity)
      .createQueryBuilder('events')
      .leftJoinAndSelect('events.author', 'author');

    if (query.date) {
      queryBuilder.andWhere('events.date = :date', { date: query.date });
    }

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const eventsCount = await queryBuilder.getCount();
    const events = await queryBuilder.getMany();

    return {
      events,
      eventsCount,
    };
  }

  async findById(id: number): Promise<EventsEntity> {
    const event = await this.eventsRepository.findOne(id);
    if (!event) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return event;
  }

  async createEvent(
    createEventDto: CreateEventDto,
    author: UserEntity,
  ): Promise<EventResponseInterface> {
    const event = new EventsEntity();
    const audience = await this.audienceRepository.findOne({
      audience: createEventDto.audience,
    });
    if (!audience) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    Object.assign(event, createEventDto);
    event.author = author;
    event.audience = audience;
    return {
      event: await this.eventsRepository.save(event),
    };
  }

  async updateEvent(
    updateEventDto: UpdateEventDto,
    eventId: number,
  ): Promise<EventResponseInterface> {
    const event = await this.findById(eventId);
    const audience = await this.audienceRepository.findOne({
      audience: updateEventDto.audience,
    });
    if (!audience) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    Object.assign(event, updateEventDto);
    event.audience = audience;
    return {
      event: await this.eventsRepository.save(event),
    };
  }

  async deleteEvent(id: number): Promise<DeleteResult> {
    const event = await this.findById(id);
    return await this.eventsRepository.delete(id);
  }
}
