import React from 'react';
import {
    Card,
    CardTitle,
    CardText,
} from 'react-mdl';
import Introduction from '../newparty/Introduction';
import Calculation from '../newparty/Calculation';
import AddAlcohol from '../newparty/AddAlcohol';

export default class NewParty extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isProfileLoaded: false,
            userProfile: null,
            isNewAlcoholMode: false
        };
    }

    componentWillMount() {
        DRUNKMETER.DrunkMeterStore.UserProfileStore.getUserProfile(this.userProfileRetrievedFromStore.bind(this));
    }

    userProfileRetrievedFromStore(profile) {
        this.setState({
            isProfileLoaded: true,
            userProfile: {
                weight: +profile.weight,
                height: +profile.height,
                sex: profile.sex
            }
        });
    }

    enterAddNewAlcoholMode() {
        console.log('Entering new alcohol mode...');
        this.setState({
            isNewAlcoholMode: true
        });
    }

    leaveAddNewAlcoholMode() {
        console.log('Leaving new alcohol mode...');
        this.setState({
            isNewAlcoholMode: false
        });
    }

    render() {
        if (!this.state.isProfileLoaded) {
            return <div>Ładowanie danych...</div>;
        }

        if (this.state.isNewAlcoholMode) {
            return (
                <div>
                    <AddAlcohol title="Wybierz wypity alkohol" onGoBackClick={() => {this.leaveAddNewAlcoholMode();}} />
                </div>
            );
        }

        return (
            <div>
                <Introduction weight={this.state.userProfile.weight} height={this.state.userProfile.height} sex={this.state.userProfile.sex} />
                <Calculation title="Obliczanie promili" onEnterNewAlcoholModeClick={() => this.enterAddNewAlcoholMode()} />
            </div>
        );
    }
}
