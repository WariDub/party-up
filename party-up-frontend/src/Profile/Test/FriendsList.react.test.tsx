import  FriendList from '../components/FriendList';
import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from 'enzyme';
import { withRouter } from 'react-router';
import User from '../models/user.model';
import Gender from '../enums/gender.enum';
import Genre from '../enums/genre.enum';
import Role from '../enums/role.enum';
import toJson, { shallowToJson } from 'enzyme-to-json';
import renderer from 'react-test-renderer';


describe('FriendList', () => {
    
    test('It should mount', () => {
        let friend: User = {
            _id: '1',
            username: 'TestUsername',
            displayName: 'TestDisplayName',
            email: 'TestEmail@TestEmail.com',
            avatarUrl: 'TestAvatarURL.com',
            friends: ['Friend1', 'Friend2'],
            age: 23,
            gender: Gender.MALE,
            favoriteGenre: Genre.ACTION,
            favoriteRole: Role.DPS,
            createdAt: 5/23/2021
        }

        let component = shallow(<FriendList friends= { [ friend ]} />);
        expect(component.length).toBe(1);
    });

    test('It should render the FriendsList, with all of the correct properties', () => {
        let friend: User = {
            _id: '1',
            username: 'TestUsername',
            displayName: 'TestDisplayName',
            email: 'TestEmail@TestEmail.com',
            avatarUrl: 'TestAvatarURL.com',
            friends: ['Friend1', 'Friend2'],
            age: 23,
            gender: Gender.MALE,
            favoriteGenre: Genre.ACTION,
            favoriteRole: Role.DPS,
            createdAt: 5/23/2021
        }

        let component = renderer.create(<FriendList friends = { [friend] }/>).toJSON();

        expect(component).toMatchSnapshot();
    });
});