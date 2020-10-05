import React from "react";
import "./App.css";
// import DataList from "./component/DataList";
import InputSection from "./component/InputSection";
import newData from "./data/newData";
import * as d3 from "d3";

function App() {
	console.log(newData);
	// 데이터 테스트필터링 구현 성공쓰

	return (
		<>
			<InputSection></InputSection>
		</>
	);
}

export default App;
