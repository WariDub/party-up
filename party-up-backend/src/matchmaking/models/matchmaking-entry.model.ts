import { User } from '../../users/models/user.model';
import { Experience } from '../enums/experience.enum';

export class MatchmakingEntry {
    user: User;
    experience: Experience;
    createdAt: number;
}
