import React from 'react';
import {
    Card,
    CardTitle,
    CardText,
} from 'react-mdl';
import Introduction from '../newparty/Introduction';
import Calculation from '../newparty/Calculation';
import AlcoholList from '../newparty/AlcoholList';

export default class NewParty extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isProfileLoaded: false,
            userProfile: null,
            isNewAlcoholMode: false,
            drunkAlcohol: [],
            alcohols: []
        };
    }

    componentWillMount() {
        DRUNKMETER.DrunkMeterStore.UserProfileStore.getUserProfile(this.userProfileRetrievedFromStore.bind(this));
        DRUNKMETER.DrunkMeterStore.AlcoholLibraryStore.getAllAlcohols(this.alcoholsRetrievedFromStore.bind(this));
    }

    alcoholsRetrievedFromStore(alcohols) {
        this.setState({
            alcohols: alcohols
        });
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

    alcoholAddedToTheList(alcohol) {
        console.log('Alcohol added to the list');
        this.setState((prevState) => ({
            drunkAlcohol: prevState.drunkAlcohol.concat([alcohol])
        }));
    }

    render() {
        if (!this.state.isProfileLoaded) {
            return <div>Ładowanie danych...</div>;
        }

        if (this.state.isNewAlcoholMode) {
            return (
                <div>
                    <AlcoholList alcohols={this.state.alcohols}
                        title="Wybierz wypity alkohol"
                        actionIcon="add_circle"
                        onGoBackClick={() => { this.leaveAddNewAlcoholMode();}}
                        onAlcoholRowClick={(alcohol) => this.alcoholAddedToTheList(alcohol)} />
                </div>
            );
        }

        return (
            <div>
                <Introduction weight={this.state.userProfile.weight} height={this.state.userProfile.height} sex={this.state.userProfile.sex} />
                <Calculation title="Obliczanie promili" drunkAlcohol={this.state.drunkAlcohol} onEnterNewAlcoholModeClick={() => this.enterAddNewAlcoholMode()} />
            </div>
        );
    }
}
