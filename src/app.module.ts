import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { PeopleModule } from './people/people.module';
import { PlanetModule } from './planet/planet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        SWAPI_URL: Joi.string().required(),
      })
    }),
    DatabaseModule,
    PeopleModule,
    PlanetModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
