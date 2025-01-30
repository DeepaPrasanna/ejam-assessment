import { Injectable } from '@nestjs/common';

import { Superhero } from './interfaces/superhuman';
import { CreateSuperhumanDto } from './dto/create-superhuman.dto';

@Injectable()
export class AppService {
  private superheroes: Superhero[] = [];

  listSuperheroes(): Superhero[] {
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }

  addSuperhero(createSuperhumanDto: CreateSuperhumanDto): void {
    this.superheroes.push(createSuperhumanDto);
  }
}
