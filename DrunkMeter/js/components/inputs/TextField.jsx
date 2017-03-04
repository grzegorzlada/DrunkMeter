import React from 'react';

const propTypes = {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    validationMessage: React.PropTypes.string.isRequired,
    isInitiallyValid: React.PropTypes.bool,
    value: React.PropTypes.string,
    pattern: React.PropTypes.string
};

export default class TextField extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        var isInitiallyValid = typeof this.props.isInitiallyValid !== 'undefined'
            ? this.props.isInitiallyValid
            : true;
        this.setState({
            isValid: isInitiallyValid,
            value: this.props.value
        });
    }

    getClassName() {
        var cssClasses = 'mdl-textfield mdl-js-textfield';
        if (!this.state.isValid) {
            cssClasses += ' is-invalid';
        }
        return cssClasses;
    }

    render() {
        return (
            <div className={this.getClassName()}>
                <input className="mdl-textfield__input" type="text" id={this.props.id} pattern={this.props.pattern} />
                <label className="mdl-textfield__label" htmlFor={this.props.id}>{this.props.label}</label>
                <span className="mdl-textfield__error">{this.props.validationMessage}</span>
            </div>
        );
    }
}

TextField.propTypes = propTypes;
