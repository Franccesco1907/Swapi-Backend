import { Module } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { PlanetController } from './planet.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: `${configService.get('SWAPI_URL')}/planets`
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [PlanetController],
  providers: [PlanetService]
})
export class PlanetModule {}
