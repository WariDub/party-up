import { Inject, Logger, Module } from '@nestjs/common';
import { DATABASE_RECONNECT_TIMER } from '../config/globals';
import { mongooseConfig } from '../config/mongoose.config';
import * as mongoose from 'mongoose';

@Module({
    providers: [
        {
            provide: 'ASYNC_CONNECTION',
            useFactory: async (): Promise<mongoose.Connection> => {
                const connection = await makeDbConnection();
                return connection;
            },
        },
    ],
})
export class DatabaseModule {
    private logger = new Logger('DatabaseModule');

    constructor(@Inject('ASYNC_CONNECTION') private readonly connection: mongoose.Connection) {
        connection.on('open', () => this.logger.log('OPEN'));
        connection.on('connecting', () => this.logger.log('CONNECTING'));
        connection.on('disconnected', () => this.logger.log('DISCONNECTED'));
        connection.on('reconnecting', () => this.logger.log('RECONNECTING'));
        connection.on('error', () => this.logger.log('ERROR'));
        connection.on('unhandledRejection', () => this.logger.error('UNHANDLED'));
    }
}

async function makeDbConnection(): Promise<mongoose.Connection> {
    const USER = process.env.DB_USER;
    const PASS = process.env.DB_PASS;
    const DOMAIN = process.env.DB_DOMAIN;
    const NAME = process.env.DB_NAME;
    const ADDRESS = `mongodb+srv://${USER}:${PASS}@${DOMAIN}/${NAME}?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(ADDRESS, mongooseConfig);
        return mongoose.connection;
    } catch (error) {
        setTimeout(() => this.makeDbConnection(), DATABASE_RECONNECT_TIMER);
    }
}

export async function disconnectDbConnections(): Promise<void> {
    await mongoose.disconnect();
}
