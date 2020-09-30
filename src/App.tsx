import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import * as d3 from "d3";
import { select, selectAll } from "d3-selection";
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
