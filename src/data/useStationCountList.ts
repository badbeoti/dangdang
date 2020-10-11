import React, { useState } from "react";
import newData from "./newData";
import * as d3 from "d3";

interface DivisionProps {
	name: string;
	id: number;
	isSelect: boolean;
}

interface StateList {
	name: string;
	id: number;
	isSelect: boolean;
}

interface CountObj {
	name: string;
	divC: number;
	bikeC: number;
}
const divGroupMap = d3.group(newData, (d) => d.division);

function useStationCountList(divArr: StateList[]) {
	const [list, setList] = useState([{}]);
	setList(
		divArr.map((div: DivisionProps) => {
			const divCount = divGroupMap.get(div.name)!.length;
			const bikeCount = divGroupMap
				.get(div.name)!
				.map((data) => data.size)
				.reduce((acc, cur) => acc + cur, 0);
			const countObj: CountObj = {
				name: div.name,
				divC: divCount,
				bikeC: bikeCount,
			};
			return countObj;
		})
	);
	return list;
}

export default useStationCountList;
