import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import assert = require('assert');

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) healthcheck endpoint',  done => {
    return request(app.getHttpServer())
      .get('/api/healthcheck')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect({
        message: 'Server is running',
      }, done);
  });

  it ('/ (GET)s 1000 records', done => {
    return request(app.getHttpServer())
      .get('/api/records/1000')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((error, response) => {
        if (error) {
          throw error;
        }
        // assert the expected number of received records
        assert(response.body.length === 1000);
        done();
      });
  });

  it ('/ (GET)s stocks for a renter', done => {
    return request(app.getHttpServer())
      .get('/api/stocks/15')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((error, response) => {
        if (error) {
          throw error;
        }
        // assert response's body structure
        expect(response.body.stockContracts).toBeDefined();
        expect(response.body.totalRentalCost).toBeDefined();
        done();
      });
  });

  it ('/ (GET)s renters for a stock', done => {
    return request(app.getHttpServer())
      .get('/api/renters/15')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((error, response) => {
        if (error) {
          throw error;
        }
        // assert response's body structure
        expect(response.body.renterContracts).toBeDefined();
        done();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
