import { UnauthorizedException } from '@nestjs/common';
import { getModelForClass, prop } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';
import { Gender } from '../enums/gender.enum';
import { Genre } from '../enums/genre.enum';
import { Role } from '../enums/role.enum';

export class User {
    getId(): string {
        return this['_id'];
    }

    @prop({
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 24,
    })
    username: string;

    @prop({
        required: true,
        minlength: 4,
        maxlength: 30,
    })
    displayName: string;

    @prop({
        required: true,
        unique: true,
        minlength: 5,
    })
    email: string;

    @prop({
        required: true,
    })
    salt: string;

    @prop({
        required: true,
        minlength: 8,
        maxlength: 255,
    })
    password: string;

    @prop({
        required: false,
    })
    avatarUrl: string;

    @prop({
        required: false,
        default: 0,
    })
    age?: number;

    @prop({
        required: false,
        enum: Gender,
        default: Gender.OTHER,
    })
    gender?: Gender;

    @prop({
        required: false,
        enum: Genre,
        default: Genre.ACTION,
    })
    favoriteGenre?: Genre;

    @prop({
        required: false,
        enum: Role,
        default: Role.DPS,
    })
    favoriteRole?: Role;

    @prop({
        required: true,
    })
    createdAt: number;

    @prop({
        required: false,
        type: String,
    })
    friends: string[];

    async verifyPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

    hideSensitiveInfo() {
        this.email = null;
        this.salt = null;
        this.password = null;
    }

    guardAuthor(username: string) {
        if (username !== this.username) {
            throw new UnauthorizedException();
        }
    }
}

export const Users = getModelForClass(User);
