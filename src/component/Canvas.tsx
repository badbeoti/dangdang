import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import divisionList from "../data/divisionList";
import * as d3 from "d3";
import {select, Selection} from 'd3-selection';
import { scaleLinear, scaleBand } from "d3";
import { max } from 'd3-array'
import { axisLeft, axisBottom } from 'd3-axis'

interface SelectList {
  divisionList: { 
    name: string;
    id: number; 
    isSelect: boolean;
    divC: number;
    bikeC: number; }[];
  // onUpdate: () => void;
}

const canvas = {
  width: 800,
  height: 500,
  chartWidth: 700,
  chartHeight: 400,
  marginLeft: 50,
}

const StyledCanvas: any = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 2rem;
`

const ToggleBtn: any = styled.button`
  width: 4rem;
  height: 2rem;
  background-color: orange;
`

function Canvas ({divisionList}: SelectList) {
  // const selectList = divisionList.filter((div) => div.isSelect === true);
  const [selectList, setList] = useState(divisionList)
  const ref = useRef(null);
  const [selection, setSelection] = useState<null | Selection<null, unknown, null, undefined>>(null);
  console.log(selectList);

  let y = scaleLinear()
          .domain([0,max(selectList, d=>d.divC)!])
          .range([canvas.height,0])
        
  let x = scaleBand()
          .domain(selectList.map(d => d.name))
          .range([0,canvas.chartWidth])
          .paddingInner(0.1)

  // const yAxis = axisLeft(y)
  // const xAxis = axisBottom(x)

  useEffect(()=> {
    if (!selection) {
      setSelection(select(ref.current))
    } else {
      // const xAxisGroup = selection.append('g')
      // .attr('transform', `translate(${canvas.marginLeft},${canvas.chartHeight})`)
      // .call(xAxis)
      
      // const yAxisGroup = selection.append('g')
      // .attr('transform',`translate(${canvas.marginLeft},0)`)
      // .call(yAxis)

      selection
        .selectAll('rect')
        .data(divisionList)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d=>canvas.height - y(d.divC))
        .attr('x', d => x(d.name)!)
        .attr('y', d => y(d.divC)!)
        .attr('fill', 'blue')
      }
    },[selection]);
    
    useEffect(()=>{
      if (divisionList.filter(div => div.isSelect === true).length > 1) {
        console.log('done')
        y = scaleLinear()
          .domain([0,max(selectList, d=>d.divC)!])
          .range([canvas.height,0])
        
        x = scaleBand()
          .domain(selectList.map(d => d.name))
          .range([0,canvas.chartWidth])
          .paddingInner(0.1)

        const rects = selection!.selectAll('rect').data(selectList)

        rects
          .exit()
          .remove()

        rects
          .attr('width', x.bandwidth)
          .attr('height', d=>canvas.height - y(d.divC))
          .attr('x', d => x(d.name)!)
          .attr('y', d => y(d.divC)!)
          .attr('fill', 'blue')

        rects
          .enter()
          .append('rect')
          .attr('width', x.bandwidth)
          .attr('height', d=>canvas.height - y(d.divC))
          .attr('x', d => x(d.name)!)
          .attr('y', d => y(d.divC)!)
          .attr('fill', 'blue')
      }
  },[selectList])

  const updatelist = () => {
    setList(
      divisionList.filter(div => div.isSelect === true)
    )
  }

  return (
    <StyledCanvas>
      <svg ref={ref} width={canvas.width} height={canvas.height}>
      </svg>
      <ToggleBtn onClick={() => updatelist()}>버튼</ToggleBtn>
    </StyledCanvas>
  )
}

export default Canvas;
