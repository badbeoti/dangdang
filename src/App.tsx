import React, { useRef, useEffect } from "react";
import "./App.css";
import * as d3 from "d3";
import { select, selectAll } from "d3-selection";
import data from "./data/data.json";

function App() {
	console.log(data);
	const svgRef = useRef<SVGSVGElement | null>(null);
	useEffect(() => {
		console.log(select(svgRef.current));
		select(svgRef.current)
			.append("rect")
			.attr("width", 100)
			.attr("height", 100)
			.attr("fill", "blue");
	});

	return (
		<div>
			<svg ref={svgRef} />
		</div>
	);
}

export default App;
