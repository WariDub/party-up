import {
    IsEmail,
    IsLowercase,
    IsOptional,
    IsString,
    Length,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
    @IsOptional()
    @IsString()
    @Length(4, 24)
    @Matches(/[A-Za-z0-9]/, { message: 'username can only contain letters and numbers' })
    @IsLowercase()
    readonly username: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    @IsEmail({}, { message: 'email must be valid' })
    readonly email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(255)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
    })
    readonly password: string;
}
