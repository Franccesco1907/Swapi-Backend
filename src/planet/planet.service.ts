import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PlanetService {
  constructor( private readonly httpService: HttpService) { }

  create(createPlanetDto: CreatePlanetDto) {
    return 'This action adds a new planet';
  }

  async findUntilPage(page: number) {
    try {
      if (page < 1) {
        throw new HttpException('Invalid page number', HttpStatus.BAD_REQUEST);
      }
      const planets = [];
      let currentPage = 1;
      let nextPage = `${this.httpService.axiosRef.defaults.baseURL}?page=${currentPage}`;

      while (currentPage <= page) {
        const { data } = await firstValueFrom(this.httpService.get(nextPage));
        planets.push(...data.results);
        nextPage = data.next;
        currentPage++;

        if (!nextPage || currentPage > page) {
          break;
        }
      }

      return planets;
    } catch (error) {
      console.error(`The following error has ocurred: ${error}`);
      throw new HttpException(`The planets could not be retrieved`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${id}`)
      )
      return data;
    } catch (error) {
      console.error(`The following error has ocurred: ${error}`);
      throw new HttpException(`The planets could not be retrieved`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
