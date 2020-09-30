import React from "react";
import newData from "../data/newData";

function DataList() {
	return (
		<section>
			{newData.map((item, index) => (
				<ul key={index}>
					<li>{index}</li>
					<li>{item.id}</li>
					<li>{item.name}</li>
					<li>{item.size}</li>
					<li>{item.division}</li>
				</ul>
			))}
		</section>
	);
}

export default DataList;
