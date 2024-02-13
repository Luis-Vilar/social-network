import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppInfo } from '../types';
import { name, description, version, author, license } from '../package.json';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return one object of type "Appinfo"', () => {
      const expected: AppInfo = {
        name,
        description,
        version,
        author,
        license,
      };
      expect(appController.getHello()).toStrictEqual(expected);
    });
  });
});
