import React, { Component } from 'react';
import { Button, List, ListItem, ListItemContent, ListItemAction, Card, CardTitle, CardText } from 'react-mdl';
import TextField from '../inputs/TextField';

const propTypes = {
    onGoBackClick: React.PropTypes.func,
    addNewItemHandler: React.PropTypes.func,
    title: React.PropTypes.string.isRequired,
    actionIcon: React.PropTypes.string,
    onAlcoholRowClick: React.PropTypes.func,
    alcohols: React.PropTypes.array
};

export default class AlcoholList extends Component {
    constructor(props) {
        super(props);
    }

    goBack() {
        if (typeof this.props.onGoBackClick === 'function') {
            this.props.onGoBackClick();
        }
    }

    getActionIcon() {
        return typeof this.props.actionIcon !== 'undefined'
            ? (<a className="mdl-list__item-secondary-action" href="#"><i className="material-icons">{this.props.actionIcon}</i></a>)
            : '';
    }

    onAlcoholRowClick(alcohol) {
        if (typeof this.props.onAlcoholRowClick === 'function') {
            this.props.onAlcoholRowClick(alcohol);
        }
    }

    renderAlcoholRows() {
        return this.props.alcohols.map((alcohol, index) => {
            return (
                <li key={index} className="mdl-list__item mdl-list__item--three-line" onClick={() => this.onAlcoholRowClick(alcohol)}>
                    <span className="mdl-list__item-primary-content">
                        <i className="material-icons mdl-list__item-avatar">local_drink</i>
                        <span>{alcohol.name}</span>
                        <span className="mdl-list__item-text-body">
                            Objętość: {alcohol.volume}, Moc: {alcohol.alcohol}%
                        </span>
                    </span>
                    <span className="mdl-list__item-secondary-content">
                        {this.getActionIcon()}
                    </span>
                </li>
            );
        });
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
                    <ul className="demo-list-three mdl-list">
                        {this.renderAlcoholRows()}
                    </ul>
                </CardText>
            </Card>

        );
    }
}

AlcoholList.propTypes = propTypes;
