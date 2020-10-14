import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import divisionList from "../data/divisionList";
import * as d3 from "d3";
import { select, Selection } from "d3-selection";
import { scaleLinear, scaleBand, axisTop } from "d3";
import { max } from "d3-array";
import { axisLeft, axisBottom, axisRight } from "d3-axis";
import effectFc from "../utils/effectFc";

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

const initialData = divisionList.sort((a, b) => (a.id > b.id ? 1 : -1));

function Canvas({ divisionList, onReset }: SelectList) {
	const [selectList, setList] = useState(divisionList);
	const [reset, setReset] = useState({
		initData: false,
	});
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
		.paddingInner(0.1);
	// .paddingOuter(0.9);

	let y = scaleLinear()
		.domain([0, max(selectList, (d) => d.divC)!])
		.range([canvas.chartHeight, 0]);

	let color = scaleLinear()
		.domain([0, max(selectList, (d) => d.divC)!])
		.range([0.2, 0.8]);

	useEffect(() => {
		if (!selection) {
			setSelection(select(ref.current));
		} else {
			const xAxisGroup = selection
				.append("g")
				.attr("transform", `translate(0,${canvas.chartHeight})`)
				.attr("class", "xAxis")
				.call(axisBottom(x));

			const yAxisGroup = selection
				.append("g")
				.attr("transform", `translate(${canvas.chartWidth},0)`)
				.call(axisRight(y));

			selection
				.selectAll("rect")
				.data(divisionList)
				.enter()
				.append("rect")
				.attr("width", x.bandwidth)
				.attr("height", (d) => canvas.chartHeight - y(d.divC) - 10)
				.attr("x", (d) => x(d.name)!)
				.attr("y", (d) => y(d.divC)!)
				.attr("fill", (d) => d3.interpolateGreens(color(d.divC)));

			selection
				.append("g")
				.attr("class", "textGroup")
				.selectAll("text")
				.data(divisionList)
				.enter()
				.append("text")
				.text((d) => d.divC)
				.attr("class", "text")
				.attr("x", (d) => x(d.name)! + x.bandwidth() / 2)
				.attr("y", (d) => y(d.divC) + 20)
				.style("text-anchor", "middle")
				.attr("fill", "white");
		}
	}, [selection]);

	useEffect(() => {
		if (
			divisionList.filter((div) => div.isSelect === true).length > 1 ||
			reset.initData === true
		) {
			effectFc(selectList, selection, canvas);
		}
	}, [selectList]);

	const updateList = () => {
		setList(divisionList.filter((div) => div.isSelect === true));
	};

	const resetList = () => {
		// 왜 더블클릭 해야 작동하는지 모르겠다.
		setReset({
			initData: true,
		});
		setTimeout(
			setList(divisionList.sort((a, b) => (a.id > b.id ? 1 : -1))),
			10
		);
		console.log(reset.initData);
		setTimeout(onReset, 10);
	};

	const sort = () => {
		if (initialData === selectList) {
			setList(initialData.sort((a, b) => (a.divC > b.divC ? 1 : -1)));
		} else {
			setList(selectList.sort((a, b) => (a.divC > b.divC ? 1 : -1)));
		}
		effectFc(selectList, selection, canvas);
	};

	return (
		<StyledCanvas>
			<svg ref={ref} width={canvas.width} height={canvas.height}></svg>
			<ToggleBtn onClick={() => updateList()}>Update Button</ToggleBtn>
			<ToggleBtn onClick={() => resetList()}>Reset Button</ToggleBtn>
			<ToggleBtn onClick={() => sort()}>Sort Button</ToggleBtn>
		</StyledCanvas>
	);
}

export default Canvas;
