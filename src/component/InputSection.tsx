import React, { useEffect, useState, useRef } from "react";
import newData from "../data/newData";
import divisionList from "../data/divisionList";
import ButtonList from "./ButtonList";
import * as d3 from "d3";

const testFilter = d3.group(newData, (d) => d.division);
const gangnamSize = testFilter
	.get("강남구")!
	.map((data) => data.size)
	.reduce((acc, cur) => acc + cur, 0);
console.log(testFilter.get("강남구"));
console.log(testFilter.get("강남구")!.length);
console.log(gangnamSize);

function InputSection() {
	const [arr, setArr] = useState(divisionList);
	useEffect(() => {
		return () => {};
	}, []);

	const onToggle = (key: number) => {
		setArr(arr.map((div) => (div.id === key ? { ...div, play: !div.isSelect } : div)));
	};

	// const onClick = (e: MouseEvent) => {
	// 	setArr(divArray.concat(e.target.name));
	// };

	return (
		<section>
			<ButtonList divisionList={divisionList} onToggle={onToggle}></ButtonList>
		</section>
	);
}

export default InputSection;
