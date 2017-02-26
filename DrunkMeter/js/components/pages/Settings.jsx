import React from 'react';
import ApplicationSettings from '../settings/ApplicationSettings';
import UserProfile from '../settings/UserProfile';

export default class Settings extends React.Component {

    render() {
        return (
            <div>
                <ApplicationSettings />
                <UserProfile />
            </div>
        );
    }
}
