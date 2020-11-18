// import data from "./data.json";
import axios from "axios";

// interface DataProps {
// 	newData?: typeof newData;
// 	// data?-옵셔널한 타입으로 변경하면 상위 컴포넌트에 props가 없어도 구동 가능.
// }

interface DataFace {
	name: string;
	size: number;
	division: string;
	id: number;
}

const data: any[] = [];
const newData: DataFace[] = [];

const getData = async () => {
	await axios.get("/data.json").then((res) => {
		data.concat(res.data);
		const prevData: DataFace[] = data.map((item: any) => {
			const newObj = {
				name: item.대여소명,
				size: item.거치대수,
				division: item.대여소_구,
				id: item.대여소ID,
			};
			return newObj;
		});
		newData.concat(prevData);
	});
};
getData();

export default newData;
