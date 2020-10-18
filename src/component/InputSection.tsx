import React, { useState, useEffect } from "react";
import styled from "styled-components";
import divisionList from "../data/divisionList";
import ButtonList from "./ButtonList";
import Canvas from "./Canvas";

const InputBoard = styled.section`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 6fr 3fr 1fr;
	justify-content: center;
`;

const CanvasSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const BtnSection = styled.section`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 8px;
`;
// grid-template-columns: repeat(auto-fit, minmax(150px, 1fr);

function InputSection() {
	const [arr, setArr] = useState(divisionList);
	// 미리 가공된 data를 useState로 담는다.

	const [axis, setAxis] = useState({
		changeAxis: false,
	});

	// useEffect(() => {
	// 	setAxis({
	// 		changeAxis: false,
	// 	});
	// });

	console.log(axis.changeAxis);

	const onSetAxis = () => {
		setAxis({
			changeAxis: !axis.changeAxis,
		});
	};

	const onToggle = (key: number) => {
		setArr(
			arr.map((div) =>
				div.id === key ? { ...div, isSelect: !div.isSelect } : div
			)
		);
	}; // 연결된 ButtonList 컴포넌트에 넣을 toggle 함수 (key:number) => void;로
	// 버튼의 id와 arr.map 함수로 설정된 div객체의 id를 비교하여 isSelect 상태를 설정한다.

	const onReset = () => {
		setArr(
			arr
				.sort((a, b) => (a.id > b.id ? 1 : -1))
				.map((div) => (div.isSelect ? { ...div, isSelect: false } : div))
		);
	};
	// Canvas 컴포넌트에서 sort를 진행하게 되면 data의 순서가 바뀌어
	// reset 작업시에는 되돌리는 메소드와 select 돼 있을 경우 false로 되돌려 초기화한다.

	return (
		<InputBoard>
			<CanvasSection>
				<Canvas
					divisionList={arr}
					onReset={onReset}
					axis={axis}
					onSetAxis={onSetAxis}
				></Canvas>
			</CanvasSection>
			<BtnSection>
				<ButtonList divisionList={arr} onToggle={onToggle}></ButtonList>
			</BtnSection>
		</InputBoard>
	);
}

export default InputSection;
