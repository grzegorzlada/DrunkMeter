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
    title: React.PropTypes.string.isRequired,
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
            <Card shadow={0} style={{
                width: '100%',
                margin: 'auto',
                marginBottom: 10
            }}>
                <CardTitle>{this.props.title}</CardTitle>
                <CardText>
                    <AlcoholList title="Wypite alkohole"
                        alcohols={this.props.drunkAlcohol}
                        actionIcon="remove_circle"
                        actionHandler={(alcohol) => this.removeAlcoholFromList(alcohol)} />
                    <PlusButton onClick={() => this.addNewItemClick()} />
                </CardText>
            </Card>
        );
    }
}

componentName.propTypes = propTypes;
