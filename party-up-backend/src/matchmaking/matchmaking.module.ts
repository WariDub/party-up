import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MatchmakingController } from './matchmaking.controller';
import { MatchmakingService } from './matchmaking.service';

@Module({
    imports: [AuthModule],
    controllers: [MatchmakingController],
    providers: [MatchmakingService],
})
export class MatchmakingModule {}
