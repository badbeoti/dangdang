import React, from "react";
import "./App.css";
import "d3";
import DataList from "./component/DataList";
import newData from "./data/newData";

function App() {
	console.log(newData);

	return (
		<>
			<DataList></DataList>
		</>
	);
}

export default App;
