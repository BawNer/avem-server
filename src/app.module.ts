import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './group/group.module';
import { NewsModule } from './news/news.module';
import ormconfig from './ormconfig';
import { RoleModule } from './role/role.module';
import { ScheduleModule } from './schedule/schedule.module';
import { TokenModule } from './token/token.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { UserModule } from './user/user.module';
import { EventsModule } from '@app/events/events.module';
import { AudienceModule } from '@app/audience/audience.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    RoleModule,
    GroupModule,
    NewsModule,
    UserModule,
    TokenModule,
    ScheduleModule,
    EventsModule,
    AudienceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
