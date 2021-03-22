import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NavBar from '../Search/components/NavBar';
import EditProfileForm from './components/EditProfileForm';

export interface ProfilePageProps extends RouteComponentProps {}

export interface ProfilePageState {}

const ProfilePage = class extends React.Component<ProfilePageProps, ProfilePageState> {
  render(): JSX.Element {
    const { history, location, match } = this.props;

    return (
      <>
        <NavBar
          history={history}
          location={location}
          match={match}
          showSearchBar={false}
          onQueryResult={null}
        />
        <EditProfileForm />
      </>
    );
  }
};

export default ProfilePage;
