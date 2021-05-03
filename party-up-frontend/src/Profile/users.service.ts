import { BACKEND_URL } from '../globals';
import User from './models/user.model';
import * as axios from 'axios';
import { EditUserDto } from './dtos/edit-user.dto';

export class UsersService {
  async getUser(id: string): Promise<User | null> {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      console.error('missing access token');
      return null;
    }

    const reqUrl = `${BACKEND_URL}/users?id=${id}`;
    const config: axios.AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const res = await axios.default.get(reqUrl, config);
      const users = res.data as User[];
      if (users.length) {
        return users[0];
      } else {
        return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async editUser(username: string, editUserDto: EditUserDto): Promise<User | null> {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      console.error('missing access token');
      return null;
    }

    const reqUrl = `${BACKEND_URL}/users/${username}`;
    const config: axios.AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const user: User = await axios.default.patch(reqUrl, editUserDto, config);
      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async addFriend(username: string, friendId: string): Promise<void> {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      console.error('missing access token');
      return;
    }

    const reqUrl = `${BACKEND_URL}/users/add-friend/${username}`;
    const config: axios.AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const user: User = await axios.default.patch(reqUrl, { friends: friendId }, config);
    } catch (e) {
      console.error(e);
      return;
    }
  }

  async deleteFriend(username: string, friendId: string): Promise<void> {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      console.error('missing access token');
      return;
    }

    const reqUrl = `${BACKEND_URL}/users/unfriend/${username}/${friendId}`;
    const config: axios.AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const user: User = await axios.default.delete(reqUrl, config);
    } catch (e) {
      console.error(e);
      return;
    }
  }
}
