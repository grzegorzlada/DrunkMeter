import React, { Component } from 'react';
import {
    Button,
    Card,
    CardTitle,
    CardText
} from 'react-mdl';
import PlusButton from '../inputs/PlusButton';
import AlcoholList from './AlcoholList';

const propTypes = {
    onEnterNewAlcoholModeClick: React.PropTypes.func,
    drunkAlcohol: React.PropTypes.array,
    removeAlcoholFromListHandler: React.PropTypes.func
};

export default class componentName extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    addNewItemClick() {
        console.log('add item clicked.');
        if (typeof this.props.onEnterNewAlcoholModeClick === 'function') {
            this.props.onEnterNewAlcoholModeClick();
        }
    }

    removeAlcoholFromList(alcohol) {
        if (typeof this.props.removeAlcoholFromListHandler === 'function') {
            this.props.removeAlcoholFromListHandler(alcohol);
        }
    }

    render() {
        return (
            <div>
                <Card shadow={0} style={{
                    width: '100%',
                    margin: 'auto',
                    marginBottom: 10
                }}>
                    <CardTitle>Wypite alkohole</CardTitle>
                    <CardText>
                        <AlcoholList title="Wypite alkohole"
                            alcohols={this.props.drunkAlcohol}
                            actionIcon="remove_circle"
                            actionHandler={(alcohol) => this.removeAlcoholFromList(alcohol)} />
                        <PlusButton onClick={() => this.addNewItemClick()} />
                    </CardText>
                </Card>

                <Card shadow={0} style={{
                    width: '100%',
                    margin: 'auto',
                    marginBottom: 10
                }}>
                    <CardTitle>Rozkład promili</CardTitle>
                    <CardText>
                        Tutaj będą liczone promile.
                    </CardText>
                </Card>
            </div>
        );
    }
}

componentName.propTypes = propTypes;
