import Gender from '../enums/gender.enum';
import Genre from '../enums/genre.enum';
import Role from '../enums/role.enum';

interface User {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  friends: string[];
  age?: number;
  gender?: Gender;
  favoriteGenre?: Genre;
  favoriteRole?: Role;
  createdAt: number;
}

export default User;
