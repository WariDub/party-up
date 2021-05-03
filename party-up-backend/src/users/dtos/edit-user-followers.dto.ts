import {  IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditUsersFollowersDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly displayName?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly friends?: string;
}
