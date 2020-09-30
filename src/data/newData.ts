import data from "./data.json";

// interface DataProps {
// 	newData?: typeof newData;
// 	// data?-옵셔널한 타입으로 변경하면 상위 컴포넌트에 props가 없어도 구동 가능.
// }

const newData = data.map((item) => {
	const newObj = {
		name: item.대여소명,
		size: item.거치대수,
		division: item.대여소_구,
		id: item.대여소ID,
	};
	return newObj;
});

export default newData;
