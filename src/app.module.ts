import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import config from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      synchronize: true,
      autoLoadEntities: true,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
    }),
    BlogModule,
  ],
})
export class AppModule {}
