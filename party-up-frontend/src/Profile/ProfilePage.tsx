import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NavBar from '../Search/components/NavBar';
import EditProfileForm from './components/EditProfileForm';
import FriendList from './components/FriendList';
import User from './models/user.model';
import * as axios from 'axios';
import * as jwtDecode from 'jwt-decode';
import { BACKEND_URL } from '../globals';
import { JwtPayload } from '../Auth/interfaces/jwt-payload.interface';

export interface ProfilePageProps extends RouteComponentProps {}

export interface ProfilePageState {
  user: User | null;
  friends: User[];
}

const ProfilePage = class extends React.Component<ProfilePageProps, ProfilePageState> {
  constructor(props: ProfilePageProps) {
    super(props);

    this.state = {
      user: null,
      friends: [],
    };
  }

  async componentDidMount() {
    await this.fetchAndSetUser();
    const { user } = this.state;
    if (user) {
      await this.fetchAndSetFriends(user);
    }
  }

  render(): JSX.Element {
    const { history, location, match } = this.props;
    const { user, friends } = this.state;

    return (
      <>
        <NavBar
          history={history}
          location={location}
          match={match}
          showSearchBar={false}
          onQueryResult={null}
        />
        {user ? <EditProfileForm user={user} /> : null}
        <FriendList friends={friends} />
      </>
    );
  }

  fetchAndSetUser = async (): Promise<void> => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      return console.error('missing access token');
    }

    const payload: JwtPayload = jwtDecode.default(accessToken);

    try {
      const user = await this.fetchUser(payload.uid);
      if (user) {
        this.setState({ user });
      }
    } catch (e) {
      console.error(e);
    }
  };

  fetchAndSetFriends = async (user: User): Promise<void> => {
    const operations = [];

    for (const friend of user.friends) {
      operations.push(this.fetchUser(friend));
    }

    try {
      const results = await Promise.all(operations);
      const friends: User[] = [];
      for (const result of results) {
        if (result === null) {
          continue;
        }
        friends.push(result);
      }

      this.setState({ friends });
    } catch (e) {
      console.error(e);
    }
  };

  fetchUser = async (id: string): Promise<User | null> => {
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
  };
};

export default ProfilePage;
