// import React, { useEffect, useState, useRef } from "react";
// import styled from "styled-components";
// import divisionList from "../data/divisionList";
import * as d3 from "d3";
import { select, Selection } from "d3-selection";
import { scaleLinear, scaleBand } from "d3";
import { max } from "d3-array";
import { axisLeft, axisBottom } from "d3-axis";

function effectFc(
	selectList: {
		name: string;
		id: number;
		isSelect: boolean;
		divC: number;
		bikeC: number;
	}[],
	selection: d3.Selection<null, unknown, null, undefined> | null,
	canvas: {
		width: number;
		height: number;
		chartWidth: number;
		chartHeight: number;
		marginLeft: number;
	}
) {
	const x = scaleBand()
		.domain(selectList.map((d) => d.name))
		.range([0, canvas.chartWidth])
		.paddingInner(0.1);

	const y = scaleLinear()
		.domain([0, max(selectList, (d) => d.divC)!])
		.range([canvas.chartHeight, 0]);

	const color = scaleLinear()
		.domain([0, max(selectList, (d) => d.divC)!])
		.range([0.2, 0.8]);

	selection!.selectAll("g").remove();

	const xAxisGroup = selection!
		.append("g")
		.attr("transform", `translate(0,${canvas.chartHeight})`)
		.call(axisBottom(x));

	const rects = selection!.selectAll("rect").data(selectList);

	rects.exit().remove();

	rects
		.attr("width", x.bandwidth)
		.attr("height", (d) => canvas.chartHeight - y(d.divC) - 10)
		.attr("x", (d) => x(d.name)!)
		.attr("y", (d) => y(d.divC)!)
		.attr("fill", (d) => d3.interpolateGreens(color(d.divC)));

	rects
		.enter()
		.append("rect")
		.attr("width", x.bandwidth)
		.attr("height", (d) => canvas.chartHeight - y(d.divC) - 10)
		.attr("x", (d) => x(d.name)!)
		.attr("y", (d) => y(d.divC)!)
		.attr("fill", (d) => d3.interpolateGreens(color(d.divC)));
}

export default effectFc;
