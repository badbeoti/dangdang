import React from "react";
import "./App.css";
import DataList from "./component/DataList";
import newData from "./data/newData";
import { group } from "d3-array";

function App() {
	console.log(newData);
	const testFilter = d3.group(newData, (d) => d.division);
	console.log(testFilter);

	return (
		<>
			<DataList></DataList>
		</>
	);
}

export default App;
