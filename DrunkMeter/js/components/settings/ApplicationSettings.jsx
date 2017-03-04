import React from 'react';
import {
    Button,
    IconButton,
    Card,
    CardTitle,
    CardText,
    CardActions,
    CardMenu,
    Switch
} from 'react-mdl';

export default class ApplicationSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSavingLocationEnabled: true,
            isSavingHistoryEnabled: true,
            isDataLoaded: false
        };
    }

    componentWillMount() {
        DRUNKMETER.DrunkMeterStore.SettingsStore.getSettingsList(this.settingsListReceived.bind(this));
    }

    settingsListReceived(settingsList) {
        this.setState(settingsList);
        this.setState({isDataLoaded: true});
    }

    getSaveLocationText() {
        return this.state.isSavingLocationEnabled
            ? 'Podczas tworzenia wpisu nowej imprezy Twoja lokalizacja będzie zapisywana.'
            : 'Twoja lokalizacja nigdy nie będzie zapisywana.';
    }

    getSaveHistoryText() {
        return this.state.isSavingHistoryEnabled
            ? 'Historia Twoich imprez będzie zapisywana, a Ty będziesz mógł ją przeglądać. Historia nie jest nigdzie wysyłana, a Ty możesz ją w dowolnym momencie wyczyścić.'
            : 'Historia Twoich imprez nie jest zapisywana.';
    }

    saveLocationChanged(e) {
        this.setState({'isSavingLocationEnabled': e.target.checked});
    }

    saveHistoryChanged(e) {
        this.setState({'isSavingHistoryEnabled': e.target.checked});
    }

    render() {
        return (
            <Card shadow={0} style={{
                width: '100%',
                margin: 'auto'
            }}>
                <CardTitle>Ustawienia aplikacji</CardTitle>
                <CardText>
                    <Switch ripple id="switch1" checked={this.state.isSavingLocationEnabled} disabled={!this.state.isDataLoaded} onChange={(e) => this.saveLocationChanged(e)}>Zapisuj lokalizację</Switch>
                    <p>{this.getSaveLocationText()}</p>
                    <Switch ripple id="switch1" checked={this.state.isSavingHistoryEnabled} disabled={!this.state.isDataLoaded} onChange={(e) => this.saveHistoryChanged(e)}>Zapisuj historię</Switch>
                    <p>{this.getSaveHistoryText()}</p>
                </CardText>
            </Card>
        );
    }
}
