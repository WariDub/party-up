import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

bootstrap();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    await app.listen(process.env.PORT || 3000);
}
