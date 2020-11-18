import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import divisionList from "../data/divisionList";
import * as d3 from "d3";
import { select, Selection } from "d3-selection";
import {
	scaleLinear,
	scaleBand,
	easeElastic,
	easeBounce,
	easeCircleOut,
} from "d3";
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
	axis: {
		changeAxis: boolean;
	};
	onSetAxis: () => void;
}

interface Axis {
	axis: (selection: Selection<SVGGElement, unknown, null, undefined>) => void;
}

const canvas = {
	width: 1200,
	height: 500,
	chartWidth: 1150,
	chartHeight: 400,
	marginLeft: 100,
};

const StyledCanvas: any = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	margin-top: 4rem;
`;

const BtnWrapper: any = styled.div`
	display: flex;
	width: 80%;
	justify-content: space-around;
	flex-direction: row;
	margin-bottom: 3rem;
`;

const ToggleBtn: any = styled.button`
	width: 12rem;
	height: 3rem;
	font-size: 1rem;
	vertical-align: middle;
	cursor: pointer;
	background-color: #078c2b;
	&:hover {
		background-color: #7bed9f;
	}
	color: white;
	font-weight: 700;
	border: medium solid #7bed9f;
	border-radius: 1rem;
`;

const initialData = divisionList.sort((a, b) => (a.id > b.id ? 1 : -1));

function Canvas({ divisionList, onReset, axis, onSetAxis }: SelectList) {
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
		.paddingInner(0.1);

	let y = scaleLinear()
		.domain([0, max(selectList, (d) => (axis.changeAxis ? d.bikeC : d.divC))!])
		.range([canvas.chartHeight, 0]);

	let color = scaleLinear()
		.domain([0, max(selectList, (d) => (axis.changeAxis ? d.bikeC : d.divC))!])
		.range([0.2, 0.8]);

	const xAxisBot = d3.axisBottom(x);
	const yAxisRight = d3.axisRight(y);

	useEffect(() => {
		if (!selection) {
			setSelection(select(ref.current));
		} else {
			const xAxisGroup = selection
				.append("g")
				.attr("font-weight", "bold")
				.attr("transform", `translate(0,${canvas.chartHeight})`)
				.attr("class", "xAxis")
				.call(xAxisBot);

			const yAxisGroup = selection
				.append("g")
				.attr("transform", `translate(${canvas.chartWidth},0)`)
				.call(yAxisRight);

			selection
				.selectAll("rect")
				.data(divisionList)
				.enter()
				.append("rect")
				// .attr("fill", (d) => d3.interpolateGreens(color(d.divC)))
				.attr("fill", (d) =>
					axis.changeAxis
						? d3.interpolateGreens(color(d.bikeC)!)
						: d3.interpolateGreens(color(d.divC)!)
				)

				.attr("width", x.bandwidth)
				.attr("x", (d) => x(d.name)!)

				.attr("height", 0)
				.attr("y", canvas.chartHeight)
				.transition()
				.duration(1000)
				.delay((_, i) => i * 100)
				.ease(easeCircleOut)
				.attr(
					"height",
					(d) =>
						canvas.chartHeight - y(axis.changeAxis ? d.bikeC : d.divC)! - 10
				)
				.attr("y", (d) => y(axis.changeAxis ? d.bikeC : d.divC)!);

			selection
				.append("g")
				.attr("class", "textGroup")
				.selectAll("text")
				.data(divisionList)
				.enter()
				.append("text")
				.text((d) => (axis.changeAxis ? d.bikeC : d.divC))
				.attr("class", "text")
				.attr("fill", "#f5f6fa")
				.attr("x", (d) => x(d.name)! + x.bandwidth() / 2)

				.attr("y", canvas.chartHeight)
				.transition()
				.duration(1000)
				.delay((_, i) => i * 100)
				.ease(easeCircleOut)
				.attr("y", (d) => y(axis.changeAxis ? d.bikeC : d.divC)! + 20)
				.style("text-anchor", "middle")
				.style("font-weight", "bold");
		}
	}, [selection]);

	useEffect(() => {
		if (divisionList.filter((div) => div.isSelect === true).length > 1) {
			effectFc(selectList, selection, canvas, axis);
		}
	}, [selectList]);

	const updateList = () => {
		setList(divisionList.filter((div) => div.isSelect === true));
	};

	const resetList = () => {
		setList(initialData.sort((a, b) => (a.id > b.id ? 1 : -1)));
		console.log(initialData);
		effectFc(selectList, selection, canvas, axis);
		// 초기화면에서 정렬과 초기화가 안되는 부분을 그냥 resetList 함수에서도 effectFc를 실행시켜
		// 해결하기로 했다.
		onReset();
	};

	const sort = () => {
		if (initialData === selectList) {
			setList(
				initialData.sort((a, b) =>
					axis.changeAxis
						? a.bikeC > b.bikeC
							? 1
							: -1
						: a.divC > b.divC
						? 1
						: -1
				)
			);
		} else {
			setList(
				selectList.sort((a, b) =>
					axis.changeAxis
						? a.bikeC > b.bikeC
							? 1
							: -1
						: a.divC > b.divC
						? 1
						: -1
				)
			);
		}
		effectFc(selectList, selection, canvas, axis);
	};

	const switchAxis = () => {
		onSetAxis();
		effectFc(selectList, selection, canvas, { changeAxis: !axis.changeAxis });
	};

	return (
		<StyledCanvas>
			<svg ref={ref} width={canvas.width} height={canvas.height}></svg>
			<BtnWrapper>
				<ToggleBtn onClick={() => switchAxis()}>
					단위 변경 [{axis.changeAxis ? "자전거 수" : "거치대 수"}]
				</ToggleBtn>
				<ToggleBtn onClick={() => updateList()}>Update Button</ToggleBtn>
				<ToggleBtn onClick={() => resetList()}>Reset Button</ToggleBtn>
				<ToggleBtn onClick={() => sort()}>Sort Button</ToggleBtn>
			</BtnWrapper>
		</StyledCanvas>
	);
}

export default Canvas;
