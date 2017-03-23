import React from 'react';
import { Button, Card, CardTitle, CardText } from 'react-mdl';
import Introduction from '../newparty/Introduction';
import Calculation from '../newparty/Calculation';
import AlcoholList from '../newparty/AlcoholList';
import { displayToast } from '../../helpers/ToastHelper';

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
            isPartyLoaded: false,
            userProfile: null,
            drunkAlcohol: [],
            alcohols: [],
            mode: MODES.normal,
            lastRemovedAlcohol: null,
            parties: null,
            partyDetails: {}
        };
    }

    componentWillMount() {
        DRUNKMETER.DrunkMeterStore.UserProfileStore.getUserProfile(this.userProfileRetrievedFromStore.bind(this));
        DRUNKMETER.DrunkMeterStore.AlcoholLibraryStore.getAllAlcohols(this.alcoholsRetrievedFromStore.bind(this));
        DRUNKMETER.DrunkMeterStore.PartiesStore.getParties(this.partiesRetrievedFromStore.bind(this));
    }

    componentWillUpdate(nextProps, nextState) {
        this.saveNewDataInStore(nextState);
    }

    alcoholsRetrievedFromStore(alcohols) {
        this.setState({
            alcohols: alcohols
        });
    }

    partiesRetrievedFromStore(parties) {
        var current = parties.current;

        this.setState({
            isPartyLoaded: true,
            parties: parties,
            drunkAlcohol: current.drunkAlcohol,
            partyDetails: {
                startTime: current.startTime,
                endTime: current.endTime,
                stomachLevel: current.userProfile.stomachLevel
            }
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
        this.setState({
            drunkAlcohol: drunkAlcohol,
            lastRemovedAlcohol: alcohol
        });

        displayToast('Alkohol usunięty', 5000, 'Cofnij', this.undoRemovingLastAlcohol.bind(this));
    }

    saveNewDataInStore(state) {
        if (typeof state.parties === 'undefined' || !state.parties) {
            return;
        }

        var currentParty = state.parties.current;
        var userProfile = state.userProfile;
        currentParty.userProfile = {
            weight: +userProfile.weight,
            height: +userProfile.height,
            sex: userProfile.sex,
            stomachLevel: state.partyDetails.stomachLevel
        };
        currentParty.drunkAlcohol = state.drunkAlcohol;
        currentParty.startTime = state.partyDetails.startTime;
        currentParty.endTime = state.partyDetails.endTime;
        DRUNKMETER.DrunkMeterStore.PartiesStore.saveParties(state.parties);
    }

    undoRemovingLastAlcohol() {
        if (this.state.lastRemovedAlcohol === null) {
            return;
        }
        this.addAlcoholToDrunkList(this.state.lastRemovedAlcohol);
        this.setState({ lastRemovedAlcohol: null });
    }

    finishParty() {
        var currentParty = this.state.parties.current;
        var parties = this.state.parties;
        parties.historical.push(currentParty);
        parties.current = DRUNKMETER.DrunkMeterStore.PartiesStore.getEmptyCurrentParty();

        this.setState({
            parties: parties,
            drunkAlcohol: [],
            partyDetails: {
                startTime: '20:00',
                endTime: '23:00',
                stomachLevel: 0.5
            }
        });

        displayToast('Impreza zapisana w historii imprez. Możesz rejestrować nową imprezę', 5000);
    }

    partyDetailsChanged(partyDetails) {
        this.setState({
            partyDetails: partyDetails
        });
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
                <Introduction
                    weight={this.state.userProfile.weight}
                    height={this.state.userProfile.height}
                    sex={this.state.userProfile.sex}
                    partyDetails={this.state.partyDetails}
                    onPartyDetailsChange={(partyDetails) => { this.partyDetailsChanged(partyDetails); }} />
                <Calculation
                    drunkAlcohol={this.state.drunkAlcohol}
                    partyDetails={this.state.partyDetails}
                    personData={this.state.userProfile}
                    onEnterNewAlcoholModeClick={() => this.goToMode(MODES.addNewAlcohol)}
                    removeAlcoholFromListHandler={(alcohol) => this.removeAlcoholFromDrunkList(alcohol)} />
                <Button raised colored onClick={() => { this.finishParty(); }}>Zakończ imprezę</Button>
            </div>
        );
    }

    render() {
        if (!this.state.isProfileLoaded || !this.state.isPartyLoaded) {
            return (<div>Ładowanie danych...</div>);
        }

        if (this.state.mode === MODES.addNewAlcohol) {
            return this.renderAddNewAlcoholMode();
        }

        return this.renderNormalMode();
    }
}
