import Gender from '../enums/gender.enum';
import Genre from '../enums/genre.enum';
import Role from '../enums/role.enum';

export interface EditUserDto {
  readonly displayName?: string;
  readonly avatarUrl?: string;
  readonly age?: number;
  readonly gender?: Gender;
  readonly favoriteGenre?: Genre;
  readonly favoriteRole?: Role;
}
