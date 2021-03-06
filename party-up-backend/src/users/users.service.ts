import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from '../auth/dtos/auth-credentials.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { EditUsersFollowersDto } from './dtos/edit-user-followers.dto';
import { User, Users } from './models/user.model';
import * as bcrypt from 'bcryptjs';
import { GetUsersFilterDto } from './dtos/get-users-filter.dto';

@Injectable()
export class UsersService {
    async saveNewUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, email, password } = authCredentialsDto;
        if (!username || !email) {
            throw new UnauthorizedException('Missing credentials.');
        }

        const user = new Users();
        user.username = username.toLowerCase().trim();
        user.displayName = username;
        user.email = email.toLowerCase().trim();
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        user.createdAt = Date.now();

        try {
            await user.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exists.');
            } else {
                throw new InternalServerErrorException(
                    'An error occured while creating your account.',
                );
            }
        }
    }

    async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        try {
            const users = await this.getUsersWithSensitiveInfo(getUsersFilterDto);
            users.forEach((user) => user.hideSensitiveInfo());
            return users;
        } catch (error) {
            throw error;
        }
    }

    async getUsersWithSensitiveInfo(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        const { id, name } = getUsersFilterDto;
        const query = {};

        if (id) {
            query['_id'] = id;
        }
        if (name) {
            query['displayName'] = { $regex: `.*${[name]}.*` };
        }
        if (!Object.keys(query).length) {
            throw new NotFoundException('Query parameters too broad.');
        }

        try {
            const users = await Users.find(query).limit(10);
            return users;
        } catch (error) {
            throw new NotFoundException();
        }
    }

    async getUserByIdWithSensitiveInfo(id: string): Promise<User> {
        try {
            const user = await Users.findById(id);
            return user;
        } catch (error) {
            return null;
        }
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.getUserByIdWithSensitiveInfo(id);
        if (user) {
            user.hideSensitiveInfo();
        }
        return user;
    }

    async getUserByUsernameWithSensitiveInfo(username: string): Promise<User> {
        try {
            const user = await Users.findOne({ username });
            return user;
        } catch (error) {
            return null;
        }
    }

    async getUserByUsername(username: string): Promise<User> {
        const user = await this.getUserByUsernameWithSensitiveInfo(username);
        if (user) {
            user.hideSensitiveInfo();
        }
        return user;
    }

    async getUserByEmailWithSensitiveInfo(email: string): Promise<User> {
        try {
            const user = await Users.findOne({ email });
            return user;
        } catch (error) {
            return null;
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.getUserByEmailWithSensitiveInfo(email);
        if (user) {
            user.hideSensitiveInfo();
        }
        return user;
    }

    async editUser(user: User, username: string, editUserDto: EditUserDto): Promise<User> {
        user.guardAuthor(username);

        const options = { new: true };

        try {
            const user = await Users.findOneAndUpdate({ username }, editUserDto, options);
            user.hideSensitiveInfo();
            return user;
        } catch (error) {
            throw new NotFoundException('User not found.');
        }
    }

    async addFriendList(
        user: User,
        username: string,
        editUsersFollowersDto: EditUsersFollowersDto,
    ): Promise<User> {
        user.guardAuthor(username);

        const options = { new: true };

        try {
            const user = await Users.findOneAndUpdate(
                { username },
                { $push: { friends: editUsersFollowersDto.friends } },
                options,
            );
            user.hideSensitiveInfo();
            return user;
        } catch (error) {
            throw new NotFoundException('User not found.');
        }
    }

    async unFriendList(user: User, username: string, friendId: string): Promise<User> {
        user.guardAuthor(username);
        const options = { new: true };

        try {
            const user = await Users.findOneAndUpdate(
                { username },
                { $pull: { friends: friendId } },
                options,
            );
            user.hideSensitiveInfo();
            return user;
        } catch (error) {
            throw new NotFoundException('User not found.');
        }
    }
}
