import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/decorators/get-user.decorator';
import { User } from '../users/models/user.model';
import { CreateMatchmakingEntryDto } from './dtos/create-matchmaking-entry.dto';
import { MatchmakingService } from './matchmaking.service';
import { Match } from './models/match.model';

@Controller('matchmaking')
@UseGuards(AuthGuard())
export class MatchmakingController {
    constructor(private readonly matchmakingService: MatchmakingService) {}

    @Post()
    async createMatchmakingEntry(
        @GetUser() user: User,
        @Body(ValidationPipe) createMatchmakingEntryDto: CreateMatchmakingEntryDto,
    ): Promise<Match[]> {
        return this.matchmakingService.createMatchmakingEntry(user, createMatchmakingEntryDto);
    }
}
