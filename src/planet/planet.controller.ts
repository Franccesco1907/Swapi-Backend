import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { PlanetService } from './planet.service';

@Controller('planets')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Post()
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetService.create(createPlanetDto);
  }

  @Get()
  findUntilPage(@Query('page') page: string) {
    return this.planetService.findUntilPage(+page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planetService.findOne(+id);
  }
}
