import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';

@Module({
    imports: [UsersModule, DatabaseModule, AuthModule, GamesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
