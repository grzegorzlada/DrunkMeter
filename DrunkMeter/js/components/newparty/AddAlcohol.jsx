import React, { Component } from 'react';
import { Button, List, ListItem, ListItemContent, ListItemAction, Card, CardTitle, CardText } from 'react-mdl';

const propTypes = {
    onGoBackClick: React.PropTypes.func,
    addNewItemHandler: React.PropTypes.func,
    title: React.PropTypes.string.isRequired
};

export default class AddAlcohol extends Component {
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

    renderAlcoholRows() {
        return this.state.alcohols.map((value, index) => {
            return (
                <ListItem threeLine key={index}>
                    <ListItemContent avatar="local_drink" subtitle={this.getSubtitleRowForAlcohol(value)}>
                        {value.name}
                    </ListItemContent>
                    <ListItemAction>
                        <a href="#"><i className="material-icons">add_circle</i></a>
                    </ListItemAction>
                </ListItem>
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
                    <List style={{ width: '60%' }}>
                        {this.renderAlcoholRows()}
                    </List>
                </CardText>
            </Card>

        );
    }
}

AddAlcohol.propTypes = propTypes;
