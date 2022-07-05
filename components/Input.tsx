import React, {
	Dispatch,
	RefObject,
	MutableRefObject,
	SetStateAction,
} from "react";

import { formatNumber } from "../../Helpers/utils";

type Props = {
	rangeInputClass?: string;
	id: string;
	label: string;
	isValueShown?: boolean;
	isOptionsShown?: boolean;
	inputValueRef: MutableRefObject<any>;
	minValue: number;
	maxValue: number;
	defaultValue: number;
	onChange: (arg: { target: { name: any; value: any } }) => void;
	setCurrentValue: Dispatch<SetStateAction<number>>;
	name: string;
	options?: number[];
	optionType?: string;
	rangeRef: RefObject<HTMLInputElement>;
	step: number;
	symbol?: string;
};

const Input = ({
	rangeInputClass,
	id,
	label,
	isValueShown,
	isOptionsShown,
	inputValueRef,
	minValue,
	maxValue,
	defaultValue,
	onChange,
	setCurrentValue,
	name,
	options,
	optionType,
	rangeRef,
	step,
	symbol,
}: Props) => (
	<div className={`range-input ${rangeInputClass}`}>
		{/* eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */}
		<label className="range-input__label" id={id}>
			{label}
		</label>
		{symbol && (
			<>
				{/* eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */}
				<label className="range-input__prefix">{symbol}</label>
			</>
		)}
		{isValueShown && !isOptionsShown && (
			<input
				ref={inputValueRef}
				type="number"
				name={name}
				min={minValue}
				max={maxValue}
				defaultValue={defaultValue}
				className="range-input__current-value"
				onChange={(e) => [
					onChange(e),
					setCurrentValue(e.target.valueAsNumber),
				]}
			/>
		)}
		{!isValueShown && isOptionsShown && (
			<select
				name={name}
				className="range-input__current-option"
				ref={inputValueRef}
				onChange={(e) => [
					onChange(e),
					setCurrentValue(parseInt(e.target.value)),
				]}
			>
				{options &&
					options.map((option: number, i: any) => (
						<option
							key={i}
							value={option}
							selected={defaultValue === option}
						>
							{`${formatNumber(option)} ${optionType}`}
						</option>
					))}
			</select>
		)}
		<input
			ref={rangeRef}
			className="range-input__input"
			type="range"
			id={id}
			name={name}
			min={minValue}
			max={maxValue}
			step={step}
			defaultValue={defaultValue}
			onChange={onChange}
		/>
		<div className="range-input__min-max">
			<span className="range-input--start">
				{symbol}
				{formatNumber(minValue)}
			</span>
			<span className="range-input--end">
				{symbol}
				{formatNumber(maxValue)}
			</span>
		</div>
	</div>
);

export default Input;
