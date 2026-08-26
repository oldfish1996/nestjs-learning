import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../apps/playground/src/app.module';

describe('Week 1 Users API', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health returns service health', async () => {
    await request(app.getHttpServer()).get('/health').expect(200).expect((response) => {
      expect(response.body.status).toBe('ok');
    });
  });

  it('supports the first-week users CRUD flow', async () => {
    await request(app.getHttpServer()).get('/users').expect(200).expect((response) => {
      expect(response.body).toHaveLength(2);
    });

    const createResponse = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Charlie', age: 25 })
      .expect(201);

    expect(createResponse.body).toMatchObject({ id: 3, name: 'Charlie', age: 25 });

    await request(app.getHttpServer()).get('/users?keyword=char').expect(200).expect([createResponse.body]);

    await request(app.getHttpServer()).patch('/users/3').send({ age: 26 }).expect(200).expect({
      id: 3,
      name: 'Charlie',
      age: 26,
    });

    await request(app.getHttpServer()).delete('/users/3').expect(200).expect({
      success: true,
      deletedId: 3,
    });
  });
});
