import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import divisionList from "../data/divisionList";
import * as d3 from "d3";
import { select, Selection } from "d3-selection";
import { scaleLinear, scaleBand, easeElastic, easeBounce } from "d3";
import { max } from "d3-array";
import { axisBottom, axisRight } from "d3-axis";
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

const BtnWrapper: any = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 3rem;
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
	const resetToggle = useRef(false);
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
				.attr("fill", (d) => d3.interpolateGreens(color(d.divC)))
				.attr("width", x.bandwidth)
				.attr("x", (d) => x(d.name)!)
				.attr("height", 0)
				.attr("y", canvas.chartHeight)
				.transition()
				.duration(1000)
				.delay((_, i) => i * 100)
				.ease(easeBounce)
				.attr("height", (d) => canvas.chartHeight - y(d.divC) - 10)
				.attr("y", (d) => y(d.divC)!);

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
		resetToggle.current = false;
	}, []);

	useEffect(() => {
		console.log(resetToggle.current);
		if (
			divisionList.filter((div) => div.isSelect === true).length > 1 ||
			resetToggle.current === true
		) {
			effectFc(selectList, selection, canvas);
		}
	}, [selectList]);

	const updateList = () => {
		setList(divisionList.filter((div) => div.isSelect === true));
	};

	const resetList = () => {
		console.log(resetToggle.current);
		resetToggle.current = true;
		setTimeout(
			setList(divisionList.sort((a, b) => (a.id > b.id ? 1 : -1))),
			10
		);
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
			<BtnWrapper>
				<ToggleBtn onClick={() => updateList()}>Update Button</ToggleBtn>
				<ToggleBtn onClick={() => resetList()}>Reset Button</ToggleBtn>
				<ToggleBtn onClick={() => sort()}>Sort Button</ToggleBtn>
			</BtnWrapper>
		</StyledCanvas>
	);
}

export default Canvas;
