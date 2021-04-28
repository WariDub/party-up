import * as dotenv from 'dotenv';
dotenv.config();

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnectDbConnections } from '../src/database/database.module';
import { AuthCredentialsDto } from '../src/auth/dtos/auth-credentials.dto';

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
        return request(app.getHttpServer()).get('/').expect(200).expect('pong!');
    });

    it('/auth/login (POST)', () => {
        const username = 'tester';
        const email = null;
        const password = 'Test123456';
        const authCredentials: AuthCredentialsDto = { username, email, password };

        return request(app.getHttpServer()).post('/auth/login').send(authCredentials).expect(201);
    });

    afterAll(async () => {
        await disconnectDbConnections();
        await app.close();
    });
});
