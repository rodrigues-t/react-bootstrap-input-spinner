import React, { Component, memo } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

/**
 * Input Spinner
 * @author Thiago Rodrigues based on InputSpinner from Marco Cesarato <cesarato.developer@gmail.com>
 */

class InputSpinner extends Component<InputSpinnerProps, InputSpinnerState> {
	public static defaultProps = {
		disabled: false,
		editable: true,
		arrows: false,
		min: 0,
		max: Number.MAX_SAFE_INTEGER,
		variant: 'primary'
	};

	constructor(props: InputSpinnerProps) {
		super(props);
		if (!this.props.type) throw new Error("Bootstrap-input-number-spinner prop type is required");

		let spinnerStep = this.getSpinnerStep(this.props.step);
		this.state = {
			min: this.parseNum(this.props.min),
			max: this.parseNum(this.props.max),
			value: this.parseNum(this.props.value),
			step: spinnerStep,
			buttonPress: null,
			lastEmittedValue: undefined,
		};
	}

	getSpinnerStep(step: number): number {
		let spinnerStep = this.parseNum(step);
		if (!this.typeDecimal() && spinnerStep < 1) {
			spinnerStep = 1;
		}
		if (spinnerStep == '') {
			if (this.typeDecimal()) {
				spinnerStep = 0.1;
			} else {
				spinnerStep = 1;
			}
		}
		return spinnerStep;
	}

	componentDidUpdate(prevProps: InputSpinnerProps) {
		// Parse Min
		if (this.props.min !== prevProps.min) {
			this.setState({ min: this.parseNum(this.props.min) });
		}
		// Parse Max
		if (this.props.max !== prevProps.max) {
			this.setState({ max: this.parseNum(this.props.max) });
		}
		// Parse Step
		if (this.props.step !== prevProps.step) {
			let spinnerStep = this.getSpinnerStep(this.props.step);
			this.setState({ step: spinnerStep });
		}
	}

	onChange(num: any, event: any) {
		if (this.props.disabled) return;
		if (event === undefined) event = 'none'

		this.setState({ value: num });
		let currentValue: any = this.getValue(num);

		if (this.typeDecimal()) {
			if (this.realMatch("" + currentValue)) {
				if (this.state.min > 0 && Number(currentValue) === 0 && (event === 'none'))
					return;
				// Ex: min=2 -> se for digitado 2. será emitido 2 mas o input mantém o 2.
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
				} else {
					if (this.props.onMin) {
						this.props.onMin(this.state.min)
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
		} else {
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
				} else {
					if (this.props.onMin) {
						this.props.onMin(this.state.min)
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
	}

	emitChange(value: number) {
		this.props.onChange(value);
		this.setState({ lastEmittedValue: value });
	}

	onBlur() {
		let currentValue = this.getValue(undefined);
		if (this.typeDecimal()) {
			if (this.realMatch("" + currentValue)) {
				this.onChange(currentValue, 'blur');
			} else {
				this.onChange(this.state.min, undefined);
			}
		} else {
			if (this.intMatch("" + currentValue)) {
				this.onChange(currentValue, 'blur');
			} else {
				this.onChange(this.state.min, undefined);
			}
		}
	}

	realMatch = (value: any) => value && value.match(/-?\d+(\.(\d+)?)?/) && value.match(/-?\d+(\.(\d+)?)?/)[0] === value.match(/-?\d+(\.(\d+)?)?/).input;
	intMatch = (value: any) => value && value.match(/-?\d+/) && value.match(/-?\d+/)[0] === value.match(/-?\d+/).input;

	parseNum(num: any) {
		if (this.typeDecimal()) {
			if (num === '.')
				return '0.';
			if (this.realMatch("" + num)) {
				let numSplit = ("" + num).split(".");
				if (
					(numSplit.length > 1 && numSplit[1].length > 0 && numSplit[1].endsWith('0')) ||
					(numSplit.length > 1 && numSplit[1].length === 0)
				) {
					return num;
				}
				num = parseFloat(num);
			} else {
				num = parseFloat(num);
			}
		} else {
			num = parseInt(num);
		}
		if (isNaN(num)) {
			num = '';
		}
		return num;
	}

	getValue(num: any) {
		let value = num === undefined ? this.state.value : num;

		if (this.typeDecimal()) {
			value = this.parseNum(value);
			if (typeof value == 'number') {
				if (this.countDecimals(value) > this.props.precision)
					value = value.toFixed(this.props.precision);
			} else if (this.realMatch(value)) {
				if (this.countDecimalsFromString(value) > this.props.precision)
					value = Number(value).toFixed(this.props.precision);
			}
		}
		if (typeof value == 'number') {
			return String(this.parseNum(value));
		} else {
			if (this.realMatch(value)) {
				if (this.countDecimalsFromString(value) === this.props.precision && value.endsWith('0')) {
					value = Number(value);
				}
			}
			return String(value);
		}
	}

	countDecimals(value: number) {
		if (Math.floor(value) === value) return 0;
		return value.toString().split(".")[1].length || 0;
	}

	countDecimalsFromString(value: string) {
		let numSplit = ("" + value).split(".");
		return numSplit.length > 1 ? numSplit[1].length : 0;
	}

	getType(): string {
		return String(this.props.type).toLowerCase();
	}

	typeDecimal(): boolean {
		let type = this.getType();
		return (
			type === "float" ||
			type === "double" ||
			type === "decimal" ||
			type === "real"
		);
	}

	/**
	 * Increase
	 */
	increase() {
		if (this._isDisabledButtonRight()) return;
		let num =
			this.parseNum(this.state.value) + this.parseNum(this.state.step);
		if (this.props.onIncrease) {
			let increased_num = num;
			if (this.maxReached(num)) {
				increased_num = this.state.max;
			}
			this.props.onIncrease(increased_num);
		}

		this.onChange(num, 'inc');
	}

	decrease() {
		if (this._isDisabledButtonLeft()) {
			return;
		}
		let num = this.parseNum(this.state.value) - this.parseNum(this.state.step);
		if (this.props.onDecrease) {
			let decreased_num = num;
			if (this.minReached(num)) {
				decreased_num = this.state.min;
			}
			this.props.onDecrease(decreased_num);
		}
		this.onChange(num, 'dec');
	}

	maxReached(num: number | null = null): boolean {
		if (num == null) {
			num = this.state.value;
		}
		return num >= this.state.max;
	}

	minReached(num: number | null = null): boolean {
		if (num == null) {
			num = this.state.value;
		}
		return num <= this.state.min;
	}

	/**
	 * Is object empty
	 * @param obj
	 * @returns {boolean}
	 */
	isObjectEmpty(obj: any) {
		return Object.entries(obj).length === 0 && obj.constructor === Object;
	}

	/**
	 * Is text input editable
	 * @returns {boolean|Boolean}
	 */
	isEditable() {
		return !this.props.disabled && this.props.editable;
	}
	
	_isDisabledButtonLeft(): boolean {
		return this.props.disabled || this.minReached(this.parseNum(this.state.value));
	}
	
	_isDisabledButtonRight() {
		return this.props.disabled || this.maxReached(this.parseNum(this.state.value));
	}

	_renderLeftButtonElement(): string {
		const text =
			this.props.arrows !== false
				? "<"
				: "-";
		return text;
	}

	_renderRightButtonElement(): string {
		const text =
			this.props.arrows !== false
				? ">"

				: "+";
		return text;
	}

	_renderLeftButton() {
		return (
			<Button
				id="input-spinner-left-button"
				variant={this.props.variant}
				disabled={this._isDisabledButtonLeft()}
				onClick={() => this.decrease()}>
				{this._renderLeftButtonElement()}
			</Button>
		);
	}

	_renderRightButton() {
		return (
			<Button
				id="input-spinner-right-button"
				variant={this.props.variant}
				disabled={this._isDisabledButtonRight()}
				onClick={() => this.increase()}>
				{this._renderRightButtonElement()}
			</Button>
		);
	}

	render() {
		return (
			<InputGroup>
				<InputGroup.Prepend>
					{this._renderLeftButton()}
				</InputGroup.Prepend>
				{this.props.prepend}
				<Form.Control
					value={this.getValue(undefined)}
					readOnly={!this.isEditable()}
					onChange={event => this.onChange(event.target.value, undefined)}
					onBlur={this.onBlur.bind(this)}
				/>
				{this.props.children}
				{this.props.append}
				<InputGroup.Append>
					{this._renderRightButton()}
				</InputGroup.Append>
			</InputGroup>
		);
	}
}

type InputSpinnerState = {
	min: number
	max: number
	value: number
	step: number
	buttonPress: any | null,
	lastEmittedValue: any | undefined,
};

type InputSpinnerProps = {
	type: string,
	min: number,
	max: number,
	value: number,
	step: number,
	precision: number,
	onChange: any,
	onMax?: any,
	onMin?: any,
	onIncrease?: any,
	onDecrease?: any,
	prepend?: any,
	append?: any,
	disabled?: boolean,
	editable?: boolean,
	arrows?: boolean,
	variant?: string,
}

export { InputSpinnerProps, InputSpinner };