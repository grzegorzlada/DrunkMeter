import React from 'react';
import {
    Card,
    CardTitle,
    CardText,
} from 'react-mdl';
import Introduction from '../newparty/Introduction';

export default class NewParty extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isProfileLoaded: false,
            userProfile: null
        };
    }

    componentWillMount() {
        DRUNKMETER.DrunkMeterStore.UserProfileStore.getUserProfile(this.userProfileRetrievedFromStore.bind(this));
    }

    userProfileRetrievedFromStore(profile) {
        this.setState({
            isProfileLoaded: true,
            userProfile: {
                weight: profile.weight,
                height: profile.height,
                sex: profile.sex
            }
        });
    }

    render() {
        if (!this.state.isProfileLoaded) {
            return <div>Ładowanie danych...</div>;
        }

        return (
            <div>
                <Introduction weight={this.state.userProfile.weight} height={this.state.userProfile.height} sex={this.state.userProfile.sex} />
            </div>
        );
    }
}
