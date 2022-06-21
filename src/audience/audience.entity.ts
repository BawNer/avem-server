import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventsEntity } from '@app/events/events.entity';

@Entity('audience')
export class AudienceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  audience: string;

  @OneToMany(() => EventsEntity, (events) => events.audience)
  events: EventsEntity[];
}
