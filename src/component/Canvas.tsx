import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import {select, Selection} from 'd3-selection';
import divisionList from "../data/divisionList";
import { scaleLinear, scaleBand } from "d3";
import {max} from 'd3-array'

function Canvas () {
  const ref = useRef(null);
  const [selection, setSelection] = useState<null | Selection<null, unknown, null, undefined>>(null);

  const maxValue = max(divisionList, d=>d.divC)
  const y = scaleLinear()
              .domain([0,maxValue!])
              .range([0,500])

  const x = scaleBand()
              .domain(divisionList.map(d => d.name))
              .range([0,1000])
              .paddingInner(0.1)
              .paddingOuter(0.3)

  useEffect(()=> {
    if (!selection) {
      setSelection(select(ref.current))
    } else {
      selection
        .selectAll('rect')
        .data(divisionList)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('x', d => x(d.name)!)
        .attr('fill', 'blue')
        .attr('height', d=>y(d.divC))
    }
  },[selection]);

  return (
    <div>
      <svg ref={ref} width={1000} height={500}>
      </svg>
    </div>
  )
}

export default Canvas;
