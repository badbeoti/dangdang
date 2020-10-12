import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import divisionList from "../data/divisionList";
import * as d3 from "d3";
import { select, Selection } from "d3-selection";
import { scaleLinear, scaleBand } from "d3";
import { max } from "d3-array";
import { axisLeft, axisBottom } from "d3-axis";

interface SelectList {
	divisionList: {
		name: string;
		id: number;
		isSelect: boolean;
		divC: number;
		bikeC: number;
	}[];
	onReset: () => void;
}

const canvas = {
	width: 1200,
	height: 500,
	chartWidth: 1100,
	chartHeight: 400,
	marginLeft: 100,
};

const StyledCanvas: any = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	margin-top: 2rem;
`;

const ToggleBtn: any = styled.button`
	width: 4rem;
	height: 2rem;
	background-color: orange;

	margin-top: 1rem;
`;

const initialData = divisionList;

function Canvas({ divisionList, onReset }: SelectList) {
	const [selectList, setList] = useState(divisionList);
	const ref = useRef(null);
	const [selection, setSelection] = useState<null | Selection<
		null,
		unknown,
		null,
		undefined
	>>(null);

	let x = scaleBand()
		.domain(selectList.map((d) => d.name))
		.range([0, canvas.chartWidth])
		.paddingInner(0.05);

	let y = scaleLinear()
		.domain([0, max(selectList, (d) => d.divC)!])
		.range([canvas.height, 0]);

	// const xAxis = axisBottom(x);
	// const yAxis = axisLeft(y);

	useEffect(() => {
		if (!selection) {
			setSelection(select(ref.current));
		} else {
			// const xAxisGroup = selection
			// 	.append("g")
			// 	.attr("transform", `translate(0,${canvas.chartHeight})`)
			// 	.call(xAxis);

			// const yAxisGroup = selection
			// 	.append("g")
			// 	.attr("transform", `translate(${canvas.chartWidth},0)`)
			// 	.call(yAxis);

			selection
				.selectAll("rect")
				.data(divisionList)
				.enter()
				.append("rect")
				.attr("width", x.bandwidth)
				.attr("height", (d) => canvas.chartHeight - y(d.divC))
				.attr("x", (d) => x(d.name)!)
				.attr("y", (d) => y(d.divC)!)
				.attr("fill", "blue");

			selection
				.selectAll("text")
				.data(divisionList)
				.enter()
				.append("text")
				.text((d) => d.divC)
				.attr("x", (d) => x(d.name)! + 12)
				.attr("y", (d) => y(d.divC) + 20)
				.attr("fill", "white");
		}
	}, [selection]);

	useEffect(() => {
		if (divisionList.filter((div) => div.isSelect === true).length > 1) {
			y = scaleLinear()
				.domain([0, max(selectList, (d) => d.divC)!])
				.range([canvas.height, 0]);

			x = scaleBand()
				.domain(selectList.map((d) => d.name))
				.range([0, canvas.chartWidth])
				.paddingInner(0.1);

			const rects = selection!.selectAll("rect").data(selectList);

			rects.exit().remove();

			rects
				.attr("width", x.bandwidth)
				.attr("height", (d) => canvas.height - y(d.divC))
				.attr("x", (d) => x(d.name)!)
				.attr("y", (d) => y(d.divC)!)
				.attr("fill", "blue");

			rects
				.enter()
				.append("rect")
				.attr("width", x.bandwidth)
				.attr("height", (d) => canvas.height - y(d.divC))
				.attr("x", (d) => x(d.name)!)
				.attr("y", (d) => y(d.divC)!)
				.attr("fill", "blue");
		}
	}, [selectList]);

	const updateList = () => {
		setList(divisionList.filter((div) => div.isSelect === true));
	};

	const resetList = () => {
		setList(initialData);
		setTimeout(onReset, 10);
	};

	return (
		<StyledCanvas>
			<svg ref={ref} width={canvas.width} height={canvas.height}></svg>
			<ToggleBtn onClick={() => updateList()}>Update Button</ToggleBtn>
			<ToggleBtn onClick={() => resetList()}>Reset Button</ToggleBtn>
		</StyledCanvas>
	);
}

export default Canvas;
