import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  findUntilPage(@Query('page') page: string) {
    return this.peopleService.findUntilPage(+page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }
}
