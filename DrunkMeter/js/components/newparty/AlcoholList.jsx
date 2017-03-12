import React, { Component } from 'react';
import { Button, List, ListItem, ListItemContent, ListItemAction, Card, CardTitle, CardText } from 'react-mdl';

const propTypes = {
    onGoBackClick: React.PropTypes.func,
    addNewItemHandler: React.PropTypes.func,
    title: React.PropTypes.string.isRequired,
    actionIcon: React.PropTypes.string
};

export default class AlcoholList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDataLoaded: false,
            alcohols: []
        };
    }

    componentWillMount() {
        DRUNKMETER.DrunkMeterStore.AlcoholLibraryStore.getAllAlcohols(this.alcoholsRetrievedFromStore.bind(this));
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    alcoholsRetrievedFromStore(alcohols) {
        this.setState({
            isDataLoaded: true,
            alcohols: alcohols
        });
    }

    goBack() {
        if (typeof this.props.onGoBackClick === 'function') {
            this.props.onGoBackClick();
        }
    }

    getSubtitleRowForAlcohol(alcohol) {
        return `Objętość: ${alcohol.volume}, Moc: ${alcohol.alcohol}%`;
    }

    getActionIcon() {
        return typeof this.props.actionIcon !== 'undefined'
            ? (<a className="mdl-list__item-secondary-action" href="#"><i className="material-icons">{this.props.actionIcon}</i></a>)
            : '';
    }

    renderAlcoholRows() {
        return this.state.alcohols.map((alcohol, index) => {
            return (
                <li key={index} className="mdl-list__item mdl-list__item--three-line">
                    <span className="mdl-list__item-primary-content">
                        <i className="material-icons mdl-list__item-avatar">local_drink</i>
                        <span>{alcohol.name}</span>
                        <span className="mdl-list__item-text-body">
                            {this.getSubtitleRowForAlcohol(alcohol)}
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
