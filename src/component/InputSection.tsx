import React, { useState } from "react";
import divisionList from "../data/divisionList";
import ButtonList from "./ButtonList";
import Canvas from "./Canvas";

function InputSection() {
	const [arr, setArr] = useState(divisionList);

	const onToggle = (key: number) => {
		setArr(
			arr.map((div) =>
				div.id === key ? { ...div, isSelect: !div.isSelect } : div
			)
		);
	};

	const onReset = () => {
		setArr(
			arr.map((div) => (div.isSelect ? { ...div, isSelect: false } : div))
		);
	};

	return (
		<>
			<section className={"CanvasSection"}>
				<Canvas divisionList={arr} onReset={onReset}></Canvas>
			</section>
			<section className={"BtnSection"}>
				<ButtonList divisionList={arr} onToggle={onToggle}></ButtonList>
			</section>
		</>
	);
}

export default InputSection;
