import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EditUserDto } from './dtos/edit-user.dto';
import { EditUsersFollowersDto } from './dtos/edit-user-followers.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { GetUsersFilterDto } from './dtos/get-users-filter.dto';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers(@Query(ValidationPipe) getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        return this.usersService.getUsers(getUsersFilterDto);
    }

    @Get('/:username')
    async getUserByUsername(@Param('username') username: string): Promise<User> {
        return this.usersService.getUserByUsername(username);
    }

    @Patch('/:username')
    async editUser(
        @GetUser() user: User,
        @Param('username') username: string,
        @Body(ValidationPipe) editUserDto: EditUserDto,
    ): Promise<User> {
        return this.usersService.editUser(user, username, editUserDto);
    }

    @Patch('add-friend/:username')
    async editFriendList(
        @GetUser() user: User,
        @Param('username') username: string,
        @Body(ValidationPipe) editUsersFollowersDto: EditUsersFollowersDto,
    ): Promise<User> {
        return this.usersService.addFriendList(user, username, editUsersFollowersDto);
    }

    @Delete('unfriend/:username/:friendId')
    async UnFriendList(
        @GetUser() user: User,
        @Param('username') username: string,
        @Param('friendId') friendId: string,
    ): Promise<User> {
        return this.usersService.unFriendList(user, username, friendId);
    }
}
