/* eslint-disable */
import React, { Component } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Input Spinner
 * @author Thiago Rodrigues based on InputSpinner from Marco Cesarato <cesarato.developer@gmail.com>
 */
var InputSpinner = /** @class */ (function (_super) {
    __extends(InputSpinner, _super);
    function InputSpinner(props) {
        var _this = _super.call(this, props) || this;
        _this.realMatch = function (value) { return value && value.match(/-?\d+(\.(\d+)?)?/) && value.match(/-?\d+(\.(\d+)?)?/)[0] === value.match(/-?\d+(\.(\d+)?)?/).input; };
        _this.intMatch = function (value) { return value && value.match(/-?\d+/) && value.match(/-?\d+/)[0] === value.match(/-?\d+/).input; };
        if (!_this.props.type)
            throw new Error("Bootstrap-input-number-spinner prop type is required");
        var spinnerStep = _this.getSpinnerStep(_this.props.step);
        _this.state = {
            min: _this.parseNum(_this.props.min),
            max: _this.parseNum(_this.props.max),
            value: _this.parseNum(_this.props.value),
            step: spinnerStep,
            buttonPress: null,
            lastEmittedValue: undefined,
        };
        return _this;
    }
    InputSpinner.prototype.getSpinnerStep = function (step) {
        var spinnerStep = this.parseNum(step);
        if (!this.typeDecimal() && spinnerStep < 1) {
            spinnerStep = 1;
        }
        if (spinnerStep == '') {
            if (this.typeDecimal()) {
                spinnerStep = 0.1;
            }
            else {
                spinnerStep = 1;
            }
        }
        return spinnerStep;
    };
    InputSpinner.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.min !== prevProps.min) {
            this.setState({ min: this.parseNum(this.props.min) });
        }
        if (this.props.max !== prevProps.max) {
            this.setState({ max: this.parseNum(this.props.max) });
        }
        if (this.props.step !== prevProps.step) {
            var spinnerStep = this.getSpinnerStep(this.props.step);
            this.setState({ step: spinnerStep });
        }
    };
    InputSpinner.prototype.onChange = function (num, event) {
        if (this.props.disabled)
            return;
        if (event === undefined || event === null)
            event = 'none';
        this.setState({ value: num });
        var currentValue = this.getValue(num);
        if (this.typeDecimal()) {
            if (this.realMatch("" + currentValue)) {
                if (this.state.min > 0 && Number(currentValue) === 0 && (event === 'none'))
                    return;
                // Ex: min=2 -> if was typed '2.' it will be  emitted '2' but the input keepes '2.' as value
                if (Number(currentValue) === this.state.min && (event === 'none')) {
                    if ((Number(currentValue) !== Number(this.state.lastEmittedValue)) && this.props.onChange) {
                        this.emitChange(Number(currentValue));
                    }
                    return;
                }
                if (this.state.min > 9) {
                    if ((Number(currentValue) < this.state.min) && (event === 'none')) {
                        return;
                    }
                }
                currentValue = Number(currentValue);
                if (!this.minReached(currentValue)) {
                    if (this.maxReached(currentValue)) {
                        currentValue = this.state.max;
                        if (this.props.onMax) {
                            this.props.onMax(this.state.max);
                        }
                        this.setState({ value: currentValue });
                    }
                }
                else {
                    if (this.props.onMin) {
                        this.props.onMin(this.state.min);
                    }
                    currentValue = this.state.min;
                    this.setState({ value: currentValue });
                }
                if (event === 'blur')
                    this.setState({ value: currentValue });
                if (currentValue !== Number(this.state.lastEmittedValue) && this.props.onChange) {
                    this.emitChange(currentValue);
                }
            }
        }
        else {
            if (this.intMatch("" + currentValue)) {
                currentValue = Number(currentValue);
                if (!this.minReached(currentValue)) {
                    if (this.maxReached(currentValue)) {
                        currentValue = this.state.max;
                        if (this.props.onMax) {
                            this.props.onMax(this.state.max);
                        }
                        this.setState({ value: currentValue });
                    }
                }
                else {
                    if (this.props.onMin) {
                        this.props.onMin(this.state.min);
                    }
                    currentValue = this.state.min;
                    this.setState({ value: currentValue });
                }
                if (event === 'blur')
                    this.setState({ value: currentValue });
                if (currentValue !== Number(this.state.lastEmittedValue) && this.props.onChange) {
                    this.emitChange(currentValue);
                }
            }
        }
    };
    InputSpinner.prototype.emitChange = function (value) {
        this.props.onChange(value);
        this.setState({ lastEmittedValue: value });
    };
    InputSpinner.prototype.onBlur = function () {
        var currentValue = this.getValue(undefined);
        if (this.typeDecimal()) {
            if (this.realMatch("" + currentValue)) {
                this.onChange(currentValue, 'blur');
            }
            else {
                this.onChange(this.state.min, undefined);
            }
        }
        else {
            if (this.intMatch("" + currentValue)) {
                this.onChange(currentValue, 'blur');
            }
            else {
                this.onChange(this.state.min, undefined);
            }
        }
    };
    InputSpinner.prototype.parseNum = function (num) {
        if (this.typeDecimal()) {
            if (num === '.')
                return '0.';
            if (this.realMatch("" + num)) {
                var numSplit = ("" + num).split(".");
                if ((numSplit.length > 1 && numSplit[1].length > 0 && numSplit[1].endsWith('0')) ||
                    (numSplit.length > 1 && numSplit[1].length === 0)) {
                    return num;
                }
                num = parseFloat(num);
            }
            else {
                num = parseFloat(num);
            }
        }
        else {
            num = parseInt(num);
        }
        if (isNaN(num)) {
            num = '';
        }
        return num;
    };
    InputSpinner.prototype.getValue = function (num) {
        var value = num === undefined ? this.state.value : num;
        if (this.typeDecimal()) {
            value = this.parseNum(value);
            if (typeof value == 'number') {
                if (this.countDecimals(value) > this.props.precision)
                    value = value.toFixed(this.props.precision);
            }
            else if (this.realMatch(value)) {
                if (this.countDecimalsFromString(value) > this.props.precision)
                    value = Number(value).toFixed(this.props.precision);
            }
        }
        if (typeof value == 'number') {
            return String(this.parseNum(value));
        }
        else {
            if (this.realMatch(value)) {
                if (this.countDecimalsFromString(value) === this.props.precision && value.endsWith('0')) {
                    value = Number(value);
                }
            }
            return String(value);
        }
    };
    InputSpinner.prototype.countDecimals = function (value) {
        if (Math.floor(value) === value)
            return 0;
        return value.toString().split(".")[1].length || 0;
    };
    InputSpinner.prototype.countDecimalsFromString = function (value) {
        var numSplit = ("" + value).split(".");
        return numSplit.length > 1 ? numSplit[1].length : 0;
    };
    InputSpinner.prototype.getType = function () {
        return String(this.props.type).toLowerCase();
    };
    InputSpinner.prototype.typeDecimal = function () {
        var type = this.getType();
        return (type === "float" ||
            type === "double" ||
            type === "decimal" ||
            type === "real");
    };
    InputSpinner.prototype.increase = function () {
        if (this.isDisabledButtonRight()) {
            return;
        }
        var num = this.parseNum(this.state.value) + this.parseNum(this.state.step);
        if (this.props.onIncrease) {
            var increased_num = num;
            if (this.maxReached(num)) {
                increased_num = this.state.max;
            }
            this.props.onIncrease(increased_num);
        }
        this.onChange(num, 'inc');
    };
    InputSpinner.prototype.decrease = function () {
        if (this.isDisabledButtonLeft()) {
            return;
        }
        var num = this.parseNum(this.state.value) - this.parseNum(this.state.step);
        if (this.props.onDecrease) {
            var decreased_num = num;
            if (this.minReached(num)) {
                decreased_num = this.state.min;
            }
            this.props.onDecrease(decreased_num);
        }
        this.onChange(num, 'dec');
    };
    InputSpinner.prototype.maxReached = function (num) {
        if (num === void 0) { num = null; }
        if (num == null) {
            num = this.state.value;
        }
        return num >= this.state.max;
    };
    InputSpinner.prototype.minReached = function (num) {
        if (num === void 0) { num = null; }
        if (num == null) {
            num = this.state.value;
        }
        return num <= this.state.min;
    };
    InputSpinner.prototype.isEditable = function () {
        return !this.props.disabled && this.props.editable;
    };
    InputSpinner.prototype.isDisabledButtonLeft = function () {
        return this.props.disabled || this.minReached(this.parseNum(this.state.value));
    };
    InputSpinner.prototype.isDisabledButtonRight = function () {
        return this.props.disabled || this.maxReached(this.parseNum(this.state.value));
    };
    InputSpinner.prototype.renderLeftButtonElement = function () {
        return this.props.arrows === true ? "<" : "-";
    };
    InputSpinner.prototype.renderRightButtonElement = function () {
        return this.props.arrows === true ? ">" : "+";
    };
    InputSpinner.prototype.renderLeftButton = function () {
        var _this = this;
        return (React.createElement(Button, { id: "input-spinner-left-button", variant: this.props.variant, disabled: this.isDisabledButtonLeft(), onClick: function () { return _this.decrease(); } }, this.renderLeftButtonElement()));
    };
    InputSpinner.prototype.renderRightButton = function () {
        var _this = this;
        return (React.createElement(Button, { id: "input-spinner-right-button", variant: this.props.variant, disabled: this.isDisabledButtonRight(), onClick: function () { return _this.increase(); } }, this.renderRightButtonElement()));
    };
    InputSpinner.prototype.render = function () {
        var _this = this;
        return (React.createElement(InputGroup, { size: this.props.size },
            React.createElement(InputGroup.Prepend, null, this.renderLeftButton()),
            this.props.prepend,
            React.createElement(Form.Control, { id: "input-spinner-input", value: this.getValue(undefined), readOnly: !this.isEditable(), onChange: function (event) { return _this.onChange(event.target.value, undefined); }, onBlur: this.onBlur.bind(this) }),
            this.props.children,
            this.props.append,
            React.createElement(InputGroup.Append, null, this.renderRightButton())));
    };
    InputSpinner.defaultProps = {
        disabled: false,
        editable: true,
        arrows: false,
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
        variant: 'primary',
        size: undefined,
    };
    return InputSpinner;
}(Component));

export default InputSpinner;
