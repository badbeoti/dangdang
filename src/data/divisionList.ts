// import newData from "./newData";
import * as d3 from "d3";
import axios from "axios";

interface DataFace {
	name: string;
	size: number;
	division: string;
	id: number;
}

const data: any[] = [];
let newData: DataFace[] = [];

// async function axiosTest() {
// 	const response = await axios.get("/data.json");
// 	const responseData = await response.data;
// 	console.log(responseData);
// 	return responseData;
// }
// axiosTest();

async function getData() {
	const testFuc = axios.get("/data.json").then((res) => {
		const concatData = data.concat(res.data);
		console.log(concatData);
		const prevData: DataFace[] = concatData.map((item: any) => {
			const newObj = {
				name: item.대여소명,
				size: item.거치대수,
				division: item.대여소_구,
				id: item.대여소ID,
			};
			return newObj;
		});
		console.log(prevData);
		const testData = newData.concat(prevData);
		console.log(testData);
		return testData;
	});
	const result = await testFuc;
	console.log(result);
	newData = newData.concat(result);
	return result;
}
getData();

console.log(newData);

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
