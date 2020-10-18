// import React, { useEffect, useState, useRef } from "react";
// import styled from "styled-components";
// import divisionList from "../data/divisionList";
import * as d3 from "d3";
import { select, Selection } from "d3-selection";
import { scaleLinear, scaleBand, easeBounce, easeCircleOut } from "d3";
import { max } from "d3-array";
import { axisLeft, axisBottom, axisRight } from "d3-axis";

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
		.attr("font-weight", "bold")
		.attr("transform", `translate(0,${canvas.chartHeight})`)
		.call(axisBottom(x));

	const yAxisGroup = selection!
		.append("g")
		.attr("transform", `translate(${canvas.chartWidth},0)`)
		.call(axisRight(y));

	const rects = selection!.selectAll("rect").data(selectList);

	rects.exit().remove();

	rects
		.attr("width", x.bandwidth)
		.attr("x", (d) => x(d.name)!)
		.attr("fill", (d) => d3.interpolateGreens(color(d.divC)))
		.attr("height", 0)
		.attr("y", canvas.chartHeight)
		.transition()
		.duration(1000)
		.delay((_, i) => i * 100)
		.ease(easeCircleOut)
		.attr("height", (d) => canvas.chartHeight - y(d.divC) - 10)
		.attr("y", (d) => y(d.divC)!);

	rects
		.enter()
		.append("rect")
		.attr("width", x.bandwidth)
		.attr("x", (d) => x(d.name)!)
		.attr("fill", (d) => d3.interpolateGreens(color(d.divC)))
		.attr("height", 0)
		.attr("y", canvas.chartHeight)
		.transition()
		.duration(1000)
		.delay((_, i) => i * 100)
		.ease(easeCircleOut)
		.attr("height", (d) => canvas.chartHeight - y(d.divC) - 10)
		.attr("y", (d) => y(d.divC)!);

	const texts = selection!
		.append("g")
		.attr("class", "textGroup")
		.selectAll("text")
		.data(selectList);

	texts.exit().remove();

	texts
		.text((d) => d.divC)
		.attr("class", "text")
		.attr("fill", "#f5f6fa")
		.style("font-weight", "bold")
		.attr("x", (d) => x(d.name)! + x.bandwidth() / 2)
		.attr("y", canvas.chartHeight)
		.transition()
		.duration(1000)
		.delay((_, i) => i * 100)
		.ease(easeCircleOut)
		.attr("y", (d) => y(d.divC) + 20)
		.style("text-anchor", "middle");

	texts
		.enter()
		.append("text")
		.text((d) => d.divC)
		.attr("class", "text")
		.attr("fill", "#f5f6fa")
		.style("font-weight", "bold")
		.attr("x", (d) => x(d.name)! + x.bandwidth() / 2)
		.attr("y", canvas.chartHeight)
		.transition()
		.duration(1000)
		.delay((_, i) => i * 100)
		.ease(easeCircleOut)
		.attr("y", (d) => y(d.divC) + 20)
		.style("text-anchor", "middle");
}

export default effectFc;
