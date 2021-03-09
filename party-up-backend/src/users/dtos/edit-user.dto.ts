import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { Genre } from '../enums/genre.enum';
import { Role } from '../enums/role.enum';

export class EditUserDto {
    @IsOptional()
    @IsString()
    @Length(4, 30)
    readonly displayName?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly avatarUrl?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    readonly age?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Gender)
    readonly gender?: Gender;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Genre)
    readonly favoriteGenre?: Genre;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Role)
    readonly favoriteRole?: Role;
}
