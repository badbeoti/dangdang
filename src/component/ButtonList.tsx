import React, { ButtonHTMLAttributes, useState } from "react";
import divisionList from "../data/divisionList";
import styled from "styled-components";
interface DivisionProps {
	name: string;
	id: number;
	isSelect: boolean;
}

interface ISection extends ButtonHTMLAttributes<HTMLButtonElement> {
	divisionList: { name: string; id: number; isSelect: boolean }[];
	onToggle: (key: number) => void;
}

const StyledButton: any = styled.button`
	display: inline-flex;
	outline: none;
	border: none;
	border-radius: 4px;
	color: white;
	font-weight: bold;
	cursor: pointer;
	padding-left: 1rem;
	padding-right: 1rem;

	height: 2.25rem;
	font-size: 1rem;

	background: ${(props: DivisionProps) => (props.isSelect ? "orange" : "blue")};
	&:hover {
		background: #339af0;
	}
	&:active {
		background: ;
	}

	& + & {
		margin-left: 1rem;
	}
`;

// const initialData = divisionList as typeof divisionList;

function ButtonList({ divisionList, onToggle }: ISection) {
	// const [list, sortList] = useState(divisionList);
	// console.log(initialData);
	// if (list[0].id !== initialData[0].id) {
	// 	divisionList.sort((a, b) => (a.id < b.id ? 1 : -1));
	// 	console.log(list);
	// }
	/* after sort state check */
	return (
		<>
			{divisionList.map((div: DivisionProps) => (
				<StyledButton
					name={div.name}
					isSelect={div.isSelect}
					key={div.id}
					onClick={() => onToggle(div.id)}
				>
					{div.name}
				</StyledButton>
			))}
		</>
	);
}

export default ButtonList;
