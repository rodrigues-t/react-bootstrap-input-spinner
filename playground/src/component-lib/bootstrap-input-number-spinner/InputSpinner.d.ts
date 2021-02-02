import { Component } from "react";
/**
 * Input Spinner
 * @author Thiago Rodrigues based on InputSpinner from Marco Cesarato <cesarato.developer@gmail.com>
 */
declare class InputSpinner extends Component<InputSpinnerProps, InputSpinnerState> {
    static defaultProps: {
        disabled: boolean;
        editable: boolean;
        arrows: boolean;
        min: number;
        max: number;
        variant: string;
    };
    constructor(props: InputSpinnerProps);
    getSpinnerStep(step: number): number;
    componentDidUpdate(prevProps: InputSpinnerProps): void;
    onChange(num: any, event: any): void;
    emitChange(value: number): void;
    onBlur(): void;
    realMatch: (value: any) => any;
    intMatch: (value: any) => any;
    parseNum(num: any): any;
    getValue(num: any): string;
    countDecimals(value: number): number;
    countDecimalsFromString(value: string): number;
    getType(): string;
    typeDecimal(): boolean;
    /**
     * Increase
     */
    increase(): void;
    decrease(): void;
    maxReached(num?: number | null): boolean;
    minReached(num?: number | null): boolean;
    /**
     * Is object empty
     * @param obj
     * @returns {boolean}
     */
    isObjectEmpty(obj: any): boolean;
    /**
     * Is text input editable
     * @returns {boolean|Boolean}
     */
    isEditable(): boolean | undefined;
    _isDisabledButtonLeft(): boolean;
    _isDisabledButtonRight(): boolean;
    _renderLeftButtonElement(): string;
    _renderRightButtonElement(): string;
    _renderLeftButton(): JSX.Element;
    _renderRightButton(): JSX.Element;
    render(): JSX.Element;
}
declare type InputSpinnerState = {
    min: number;
    max: number;
    value: number;
    step: number;
    buttonPress: any | null;
    lastEmittedValue: any | undefined;
};
declare type InputSpinnerProps = {
    type: string;
    min: number;
    max: number;
    value: number;
    step: number;
    precision: number;
    onChange: any;
    onMax?: any;
    onMin?: any;
    onIncrease?: any;
    onDecrease?: any;
    prepend?: any;
    append?: any;
    disabled?: boolean;
    editable?: boolean;
    arrows?: boolean;
    variant?: string;
};
export { InputSpinnerProps, InputSpinner };
