import User from '../../Profile/models/user.model';
import Experience from '../enums/experience.enum';

interface MatchmakingEntry {
  user: User;
  identifier: string;
  experience: Experience;
  createdAt: number;
}

export default MatchmakingEntry;
