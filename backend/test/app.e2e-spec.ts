import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppService } from './../src/app.service';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const appService = {
    listSuperheroes: () => [
      { name: 'Anna Luck', humilityScore: 10, superpower: 'Leadership' },
      {
        name: 'John Doe',
        humilityScore: 4,
        superpower: 'Team building and Collaboration',
      },
    ],
  };
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET superheroes`, () => {
    return request(app.getHttpServer())
      .get('/superheroes')
      .expect(200)
      .expect(appService.listSuperheroes());
  });

  afterAll(async () => {
    await app.close();
  });
});
