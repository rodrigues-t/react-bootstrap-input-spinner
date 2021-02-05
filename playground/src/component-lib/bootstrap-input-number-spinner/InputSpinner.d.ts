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
        size: undefined;
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
    isTypeDecimal(): boolean;
    increase(): void;
    decrease(): void;
    maxReached(num?: number | null): boolean;
    minReached(num?: number | null): boolean;
    isEditable(): boolean | undefined;
    isDisabledButtonLeft(): boolean;
    isDisabledButtonRight(): boolean;
    renderLeftButtonElement(): string;
    renderRightButtonElement(): string;
    renderLeftButton(): JSX.Element;
    renderRightButton(): JSX.Element;
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
    size?: any;
};
export { InputSpinnerProps, InputSpinner };
