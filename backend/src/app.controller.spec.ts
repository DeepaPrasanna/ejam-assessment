import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('listSuperheroes', () => {
    it('should return an array of superheroes', () => {
      const result = [
        { name: 'John Doe', humilityScore: 10, superpower: 'Collaboration' },
        { name: 'Anna Luck', humilityScore: 6, superpower: 'Leadership' },
      ];
      jest
        .spyOn(appService, 'listSuperheroes')
        .mockImplementation(() => result);

      expect(appController.findAll()).toBe(result);
    });
  });
});
