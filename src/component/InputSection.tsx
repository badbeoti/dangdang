import React, { useEffect, useState, useRef } from "react";
import newData from "../data/newData";
import ButtonList from "./SelectInput";
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
	const divArray: Array<string> = [];
	const [arr, setArr] = useState(divArray);
	useEffect(() => {
		return () => {};
	}, []);

	// const onClick = (e: MouseEvent) => {
	// 	setArr(divArray.concat(e.target.name));
	// };

	return (
		<section>
			<ButtonList></ButtonList>
		</section>
	);
}

export default InputSection;
