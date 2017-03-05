import React from 'react';
import { uniqueId } from 'lodash';

const propTypes = {
    label: React.PropTypes.string.isRequired,
    validationMessage: React.PropTypes.string.isRequired,
    isInitiallyValid: React.PropTypes.bool,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    containerStyle: React.PropTypes.object,
    pattern: React.PropTypes.string,
    onChange: React.PropTypes.func
};

export default class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.Id = uniqueId('textfield_');
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

    componentWillReceiveProps(nextProps) {
        console.log('New props coming...');
        this.setState({ value: nextProps.value });
    }

    getClassName() {
        var cssClasses = 'mdl-textfield mdl-js-textfield';
        if (!this.state.isValid) {
            cssClasses += ' is-invalid';
        }
        return cssClasses;
    }

    textfieldChanhge(e) {
        var value = e.target.value;
        var regex = new RegExp(this.props.pattern);
        var isValid = regex.test(value);
        this.setState({
            value: value,
            isValid: isValid
        });

        if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
            this.props.onChange({
                value: value,
                isValid: isValid
            });
        }
    }

    getLabel() {
        return this.state.value.length > 0
            ? ''
            : this.props.label;
    }

    getContainerStyle() {
        return typeof this.props.containerStyle !== 'undefined' && this.props.containerStyle !== null
            ? this.props.containerStyle
            : {};
    }

    render() {
        return (
            <div className={this.getClassName()} style={this.getContainerStyle()}>
                <input className="mdl-textfield__input" type="text" id={this.Id} pattern={this.props.pattern}
                    onChange={(e) => { this.textfieldChanhge(e); }} value={this.state.value} />
                <label className="mdl-textfield__label" htmlFor={this.Id}>{this.getLabel()}</label>
                <span className="mdl-textfield__error">{this.props.validationMessage}</span>
            </div>
        );
    }
}

TextField.propTypes = propTypes;
