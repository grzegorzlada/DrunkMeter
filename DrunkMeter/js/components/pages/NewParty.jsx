import React from 'react';
import { Card, CardTitle, CardText } from 'react-mdl';
import Introduction from '../newparty/Introduction';
import Calculation from '../newparty/Calculation';
import AlcoholList from '../newparty/AlcoholList';

const MODES = {
    normal: 'normal',
    addNewAlcohol: 'addNewAlcohol',
    provideQuantity: 'provideQuantity'
};

export default class NewParty extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isProfileLoaded: false,
            userProfile: null,
            drunkAlcohol: [],
            alcohols: [],
            mode: MODES.normal,
            lastRemovedAlcohol: null
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

    goToMode(mode) {
        this.setState({
            mode: mode
        });
    }

    addAlcoholToDrunkList(alcohol) {
        console.log('Alcohol added to the list');
        this.setState((prevState) => ({
            drunkAlcohol: prevState.drunkAlcohol.concat([alcohol])
        }));
        this.goToMode(MODES.normal);
    }

    removeAlcoholFromDrunkList(alcohol) {
        var index = this.state.drunkAlcohol.lastIndexOf(alcohol);
        if (index < 0) {
            return;
        }

        var drunkAlcohol = this.state.drunkAlcohol;
        drunkAlcohol.splice(index, 1);
        this.setState({ drunkAlcohol: drunkAlcohol });
        this.setState({ lastRemovedAlcohol: alcohol });
        this.displayToastToUndoRemove();
    }

    displayToastToUndoRemove() {
        var snackbarContainer = document.querySelector('#toast-area');
        var data = {
            message: 'Alkohol usunięty',
            actionText: 'Cofnij',
            actionHandler: this.undoRemovingLastAlcohol.bind(this),
            timeout: 5000
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }

    undoRemovingLastAlcohol() {
        if (this.state.lastRemovedAlcohol === null) {
            return;
        }
        this.addAlcoholToDrunkList(this.state.lastRemovedAlcohol);
        this.setState({ lastRemovedAlcohol: null });
    }

    renderAddNewAlcoholMode() {
        return (
            <div>
                <Card shadow={0} style={{
                    width: '100%',
                    margin: 'auto',
                    marginBottom: 10
                }}>
                    <CardTitle>Dodaj wypity alkohol</CardTitle>
                    <CardText>
                        <AlcoholList alcohols={this.state.alcohols}
                            actionIcon="add_circle"
                            onGoBackClick={() => { this.goToMode(MODES.normal); }}
                            onAlcoholRowClick={(alcohol) => this.addAlcoholToDrunkList(alcohol)} />
                    </CardText>
                </Card>
            </div>
        );
    }

    renderNormalMode() {
        return (
            <div>
                <Introduction weight={this.state.userProfile.weight} height={this.state.userProfile.height} sex={this.state.userProfile.sex} />
                <Calculation
                    title="Obliczanie promili"
                    drunkAlcohol={this.state.drunkAlcohol}
                    onEnterNewAlcoholModeClick={() => this.goToMode(MODES.addNewAlcohol)}
                    removeAlcoholFromListHandler={(alcohol) => this.removeAlcoholFromDrunkList(alcohol)} />
            </div>
        );
    }

    render() {
        if (!this.state.isProfileLoaded) {
            return (<div>Ładowanie danych...</div>);
        }

        if (this.state.mode === MODES.addNewAlcohol) {
            return this.renderAddNewAlcoholMode();
        }

        return this.renderNormalMode();
    }
}
