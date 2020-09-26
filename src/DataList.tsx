import React from "react";
import data from "./data/data.json";

interface DataProps {
	data?: typeof data;
	// data?-옵셔널한 타입으로 변경하면 상위 컴포넌트에 props가 없어도 구동 가능.
}

function DataList(props: DataProps) {
	const newData = data.map((item) => {
		const newObj = {
			name: item.대여소명,
			size: item.거치대수,
			division: item.대여소_구,
			id: item.대여소ID,
		};
		return newObj;
	});

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
