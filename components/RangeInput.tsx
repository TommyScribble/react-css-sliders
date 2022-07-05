/* eslint-ignore jsx-a11y/label-has-for */
import React, {
	useRef,
	useState,
	useMemo,
	useCallback,
	useEffect,
	ChangeEvent,
} from "react";

import Input from "./Input";

type Props = {
	rangeInputClass?: string,
	label: string,
	id: string,
	name: string,
	minValue: number,
	maxValue: number,
	symbol?: string,
	step: number,
	defaultValue: number,
	onChange: (arg: { target: { name: any, value: any } }) => void,
	isValueShown?: boolean,
	isOptionsShown?: boolean,
	optionValues?: any, // update when passed
	optionType?: string,
};

const RangeInput = ({
	rangeInputClass,
	label,
	id,
	name,
	minValue,
	maxValue,
	symbol,
	step,
	defaultValue,
	onChange,
	isValueShown,
	isOptionsShown,
	optionValues,
	optionType,
}: Props) => {
	const rangeRef = useRef < HTMLInputElement > null;
	const inputValueRef =
		(useRef < HTMLInputElement) | (HTMLSelectElement > null);
	const [isChanging, setIsChanging] = useState(false);
	const [currentValue, setCurrentValue] = useState(0);

	useEffect(() => {
		const rangeEl = rangeRef.current;
		const inputValueEl = inputValueRef.current;
		const handleInputValueChange = (
			e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
		) => rangeEl && (rangeEl.value = e.target?.value);
		const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) =>
			inputValueEl && (inputValueEl.value = e.target?.value);

		inputValueEl?.addEventListener("input", (e: any) =>
			handleInputValueChange(e)
		);
		rangeEl?.addEventListener("input", (e: any) => handleSliderChange(e));

		return () => {
			inputValueEl?.removeEventListener("input", (e: any) =>
				handleInputValueChange(e)
			);
			rangeEl?.removeEventListener("input", (e: any) =>
				handleSliderChange(e)
			);
		};
	}, [currentValue]);

	const getPercent = useMemo(
		() => (value: number) =>
			((value - minValue) / (maxValue - minValue)) * 100,
		[minValue, maxValue]
	);

	const changeInputProgressStyle = useCallback(() => {
		rangeRef?.current?.style.setProperty(
			"--webkitProgressPercent",
			`${getPercent(rangeRef.current.valueAsNumber)}%`
		);
	}, [getPercent]);

	useEffect(() => {
		changeInputProgressStyle();
		const rangeEl = rangeRef.current;
		const inputValueEl = inputValueRef.current;
		const handleUpAndLeave = () => setIsChanging(false);
		const handleDown = () => setIsChanging(true);

		rangeEl?.addEventListener("mousemove", changeInputProgressStyle);
		rangeEl?.addEventListener("mousedown", handleDown);
		rangeEl?.addEventListener("keydown", handleDown);
		rangeEl?.addEventListener("mouseup", handleUpAndLeave);
		rangeEl?.addEventListener("keyup", handleUpAndLeave);
		rangeEl?.addEventListener("mouseleave", handleUpAndLeave);

		inputValueEl?.addEventListener("mousedown", handleDown);
		inputValueEl?.addEventListener("keydown", handleDown);
		inputValueEl?.addEventListener("change", handleDown);
		inputValueEl?.addEventListener("mouseup", handleUpAndLeave);
		inputValueEl?.addEventListener("keyup", handleUpAndLeave);

		return () => {
			rangeEl?.removeEventListener("mousemove", changeInputProgressStyle);
			rangeEl?.removeEventListener("mousedown", handleDown);
			rangeEl?.removeEventListener("keydown", handleDown);
			rangeEl?.removeEventListener("mouseup", handleUpAndLeave);
			rangeEl?.removeEventListener("keyup", handleUpAndLeave);
			rangeEl?.removeEventListener("mouseleave", handleUpAndLeave);

			inputValueEl?.removeEventListener("mousedown", handleDown);
			inputValueEl?.removeEventListener("keydown", handleDown);
			inputValueEl?.removeEventListener("change", handleDown);
			inputValueEl?.removeEventListener("mouseup", handleUpAndLeave);
			inputValueEl?.removeEventListener("keyup", handleUpAndLeave);
		};
	}, [isChanging, changeInputProgressStyle]);

	useEffect(() => {
		if (rangeRef && !rangeRef.current) return;
		changeInputProgressStyle();
	}, [rangeRef, changeInputProgressStyle]);

	return (
		<Input
			rangeInputClass={rangeInputClass}
			id={id}
			label={label}
			isValueShown={isValueShown}
			isOptionsShown={isOptionsShown}
			inputValueRef={inputValueRef}
			minValue={minValue}
			maxValue={maxValue}
			defaultValue={defaultValue}
			onChange={onChange}
			setCurrentValue={setCurrentValue}
			name={name}
			options={optionValues}
			optionType={optionType}
			rangeRef={rangeRef}
			step={step}
			symbol={symbol}
		/>
	);
};

export default RangeInput;
