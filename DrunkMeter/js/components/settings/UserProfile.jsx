import React from 'react';
import {
    Card,
    CardTitle,
    CardText,
    RadioGroup,
    Radio
} from 'react-mdl';
import TextField from '../inputs/TextField';

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sex: 'male',
            height: {value: 180},
            weight: {value: 90}
        };
    }

    onWeightChange(newWeight) {
        this.setState({weight: newWeight});
    }

    onHeightChange(newHeight) {
        this.setState({height: newHeight});
    }

    isStateValid() {
        return this.state.height.isValid && this.state.weight.isValid;
    }

    render() {
        return (
            <Card shadow={0} style={{
                width: '100%',
                margin: 'auto'
            }}>
                <CardTitle>Twój profil</CardTitle>
                <CardText>
                    <h5 className="no-margin">Płeć</h5>
                    <RadioGroup name="sex" value={this.state.sex}>
                        <Radio value="female" className="margin-right-50">Kobieta</Radio>
                        <Radio value="male">Mężczyzna</Radio>
                    </RadioGroup>
                    <h5 className="no-margin">Waga</h5>
                    <TextField
                        pattern="^[0-9]+$"
                        validationMessage="Waga musi być liczbą całkowitą"
                        label="Podaj swoją wagę w kilogramach"
                        value={this.state.weight.value}
                        onChange={(value) => this.onWeightChange(value)}
                    />
                    <h5 className="no-margin">Wzrost</h5>
                    <TextField
                        pattern="^[0-9]+$"
                        validationMessage="Wzrost musi być liczbą całkowitą"
                        label="Podaj swój wzrost w centymetrach"
                        value={this.state.height.value}
                        onChange={(value) => this.onHeightChange(value)}
                    />
                </CardText>
            </Card>
        );
    }
}
