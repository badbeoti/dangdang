import newData from "./newData";
import * as d3 from "d3";

const divGroupMap = d3.group(newData, (d) => d.division);

const divisionArr = [
	"강남구",
	"강동구",
	"강북구",
	"강서구",
	"관악구",
	"광진구",
	"구로구",
	"금천구",
	"노원구",
	"도봉구",
	"동작구",
	"동대문구",
	"마포구",
	"서대문구",
	"서초구",
	"성동구",
	"성북구",
	"송파구",
	"양천구",
	"영등포구",
	"용산구",
	"은평구",
	"종로구",
	"중구",
	"중랑구",
];

const divisionList = divisionArr.map((e: string, i: number) => {
	const divisionObj = {
		name: e,
		id: i,
		divC: divGroupMap.get(e)!.length,
		bikeC: divGroupMap
			.get(e)!
			.map((data) => data.size)
			.reduce((acc, cur) => acc + cur, 0),
		isSelect: false,
	};
	return divisionObj;
});

export default divisionList;
