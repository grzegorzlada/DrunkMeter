import React, { Component } from 'react';
import { FABButton, Icon } from 'react-mdl';

const propTypes = {
    onClick: React.PropTypes.func
};

const style = {
    button: {
        position: 'absolute',
        right: 10,
        bottom: 10
    }
};

export default class PlusButton extends Component {
    constructor(props) {
        super(props);

    }

    buttonClick() {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick();
        }
    }

    render() {
        return (
            <div style={style.button}>
                <FABButton colored ripple onClick={() => {this.buttonClick();}}>
                    <Icon name="add" />
                </FABButton>
            </div>
        );
    }
}

PlusButton.propTypes = propTypes;
