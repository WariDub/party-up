import React from 'react';
import EditProfileForm from './components/EditProfileForm';
import NavBar from './components/NavBar';

export interface ProfilePageProps {}

export interface ProfilePageState {}

const ProfilePage = class extends React.Component<ProfilePageProps, ProfilePageState> {
  render(): JSX.Element {
    return (
      <>
        <NavBar />
        <EditProfileForm />
      </>
    );
  }
};

export default ProfilePage;
