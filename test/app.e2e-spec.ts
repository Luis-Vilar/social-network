import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import type { AppInfo } from '../types';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        const appInfo: AppInfo = res.body;
        expect(appInfo).toHaveProperty('name');
        expect(appInfo).toHaveProperty('description');
        expect(appInfo).toHaveProperty('version');
        expect(appInfo).toHaveProperty('author');
        expect(appInfo).toHaveProperty('license');
      });
  });
});
