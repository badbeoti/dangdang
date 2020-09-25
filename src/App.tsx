import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import * as d3 from "d3";
import { select, selectAll } from "d3-selection";
import data from "./data/data.json";
import { stringify } from "querystring";

interface DataProps {
	data: typeof data;
}

function DataList(props: DataProps) {
	const { data } = props;
	const [prevData, setData] = useState(props);
	const newData = data.map((item) => {
		const newObj = {
			name: item.대여소명,
			size: item.거치대수,
			division: item.대여소_구,
			id: item.대여소ID,
		};
		return newObj;
	});

	console.log(newData);
	// 드디어... 데이터셋팅 완료....

	return (
		<div>
			{data.map((item, index) => (
				<li key={index}>
					{index}
					{item.대여소_구}
				</li>
			))}
		</div>
	);
}

function App() {
	// console.log(data);
	// const svgRef = useRef<SVGSVGElement | null>(null);
	// useEffect(() => {
	// 	console.log(select(svgRef.current));
	// 	select(svgRef.current)
	// 		.append("rect")
	// 		.attr("width", 100)
	// 		.attr("height", 100)
	// 		.attr("fill", "blue");
	// });

	return (
		<>
			<DataList data={data}></DataList>
		</>
		// <div>
		// 	<svg ref={svgRef} />
		// </div>
	);
}

export default App;
