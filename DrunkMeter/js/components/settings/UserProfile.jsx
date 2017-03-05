import React from 'react';
import {
    Card,
    CardTitle,
    CardText,
    RadioGroup,
    Radio
} from 'react-mdl';
import TextField from '../inputs/TextField';

const styles = {
    containerStyle: {
        paddingTop: 10
    }
};

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sex: 'male',
            height: {value: 180, isValid: true},
            weight: {value: 90, isValid: true},
            isDataLoaded: false
        };
    }

    componentWillMount() {
        DRUNKMETER.DrunkMeterStore.UserProfileStore.getUserProfile(this.userProfileRetrievedFromStore.bind(this));
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.isStateValid(nextState)) {
            this.saveUserProfileInStore(nextState);
        }
    }

    onWeightChange(newWeight) {
        this.setState({weight: newWeight});
    }

    onHeightChange(newHeight) {
        this.setState({height: newHeight});
    }

    onSexChange(e) {
        this.setState({sex: e.target.value});
    }

    isStateValid(state) {
        return state.height.isValid && state.weight.isValid;
    }

    saveUserProfileInStore(state) {
        var profile = {
            weight: state.weight.value,
            height: state.height.value,
            sex: state.sex
        };
        DRUNKMETER.DrunkMeterStore.UserProfileStore.saveNewUserProfile(profile);
    }

    userProfileRetrievedFromStore(userProfile) {
        console.log('UP retrieved');
        this.setState({
            isDataLoaded: true,
            height: {value: userProfile.height, isValid: true},
            weight: {value: userProfile.weight, isValid: true},
            sex: userProfile.sex
        });
    }

    render() {
        return (
            <Card shadow={0} style={{
                width: '100%',
                margin: 'auto'
            }}>
                <CardTitle>Twój profil</CardTitle>
                <CardText>
                    <h5 className="no-margin-bottom">Płeć</h5>
                    <RadioGroup name="sex" value={this.state.sex} onChange={(e) => this.onSexChange(e)} style={styles.containerStyle}>
                        <Radio value="female" className="margin-right-50">Kobieta</Radio>
                        <Radio value="male">Mężczyzna</Radio>
                    </RadioGroup>
                    <h5 className="no-margin-bottom">Waga</h5>
                    <TextField
                        pattern="^[0-9]+$"
                        validationMessage="Waga musi być liczbą całkowitą"
                        label="Podaj swoją wagę w kilogramach"
                        value={this.state.weight.value}
                        containerStyle={styles.containerStyle}
                        onChange={(value) => this.onWeightChange(value)}
                    />
                    <h5 className="no-margin-bottom">Wzrost</h5>
                    <TextField
                        pattern="^[0-9]+$"
                        validationMessage="Wzrost musi być liczbą całkowitą"
                        label="Podaj swój wzrost w centymetrach"
                        value={this.state.height.value}
                        containerStyle={styles.containerStyle}
                        onChange={(value) => this.onHeightChange(value)}
                    />
                </CardText>
            </Card>
        );
    }
}
