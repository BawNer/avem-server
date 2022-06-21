import { EventsEntity } from '@app/events/events.entity';

export interface EventsResponseInterface {
  events: EventsEntity[];
  eventsCount: number;
}
