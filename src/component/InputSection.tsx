import React, { useState } from "react";
import divisionList from "../data/divisionList";
import ButtonList from "./ButtonList";
import Canvas from "./Canvas";

console.log(divisionList)

function InputSection() {
	const [arr, setArr] = useState(divisionList);

	const onToggle = (key: number) => {
		setArr(arr.map((div) => (div.id === key ? { ...div, isSelect: !div.isSelect } : div)));
	};

	return (
		<>
			<section className={"BtnSection"}>
				<ButtonList divisionList={arr} onToggle={onToggle}></ButtonList>
			</section>
			<section className={"CanvasSection"}>
				<Canvas divisionList={arr}></Canvas>
			</section>
		</>
	);
}

export default InputSection;
