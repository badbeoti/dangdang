import React from "react";
import styled from "styled-components";

type DivisionProps = {
	name: string;
};

const StyledButton = styled.button`
	/* 공통 스타일 */
	display: inline-flex;
	outline: none;
	border: none;
	border-radius: 4px;
	color: white;
	font-weight: bold;
	cursor: pointer;
	padding-left: 1rem;
	padding-right: 1rem;

	/* 크기 */
	height: 2.25rem;
	font-size: 1rem;

	/* 색상 */
	background: #228be6;
	&:hover {
		background: #339af0;
	}
	&:active {
		background: #1c7ed6;
	}

	/* 기타 */
	& + & {
		margin-left: 1rem;
	}
`;

const divisionList = [
	"강남구",
	"강동구",
	"강북구",
	"강서구",
	"관악구",
	"광진구",
	"구로구",
	"금천구",
	"노원구",
	"노원구",
	"도봉구",
	"동대문구",
	"마포구",
	"서대문구",
	"서초구",
	"성동구",
	"성북구",
	"송파구",
	"양천구",
	"영등포구",
	"용산구",
	"은평구",
	"종로구",
	"중구",
	"중랑구",
];

function Button({ name }: DivisionProps) {
	return <StyledButton>{name}</StyledButton>;
}

function ButtonList() {
	console.log(Button);
	return (
		<>
			{divisionList.map((div) => (
				<Button name={div}></Button>
			))}
		</>
	);
}

export default ButtonList;
