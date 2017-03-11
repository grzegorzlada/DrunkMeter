import React, { Component } from 'react';
import { Button } from 'react-mdl';

const propTypes = {
    onGoBackClick: React.PropTypes.func,
    addNewItemHandler: React.PropTypes.func
};

export default class AddAlcohol extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

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

    goBack() {
        if (typeof this.props.onGoBackClick === 'function') {
            this.props.onGoBackClick();
        }
    }

    render() {
        return (
            <div>
                <Button raised onClick={() => {this.goBack();}}>Anuluj</Button>
            </div>
        );
    }
}

AddAlcohol.propTypes = propTypes;
