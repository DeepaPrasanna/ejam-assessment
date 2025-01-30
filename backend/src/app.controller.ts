import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { Superhero } from './interfaces/superhuman';
import { CreateSuperhumanDto } from './dto/create-superhuman.dto';

@Controller('superheroes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(): Superhero[] {
    return this.appService.listSuperheroes();
  }

  @Post()
  create(@Body() createSuperhumanDto: CreateSuperhumanDto): void {
    return this.appService.addSuperhero(createSuperhumanDto);
  }
}
