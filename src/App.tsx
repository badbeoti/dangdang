import React from "react";
import "./App.css";
import DataList from "./component/DataList";
import newData from "./data/newData";
import * as d3 from "d3";

function App() {
	console.log(newData);
	const testFilter = d3.group(newData, (d) => d.division);
	console.log(testFilter.get("강남구")!.length);
	// 데이터 테스트필터링 구현 성공쓰

	return (
		<>
			<DataList></DataList>
		</>
	);
}

export default App;
