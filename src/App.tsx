import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import * as d3 from "d3";
import { select, selectAll } from "d3-selection";
import DataList from "./DataList";

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
			<DataList></DataList>
		</>
		// <div>
		// 	<svg ref={svgRef} />
		// </div>
	);
}

export default App;
