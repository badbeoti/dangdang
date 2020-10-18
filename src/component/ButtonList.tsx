import React, { ButtonHTMLAttributes } from "react";
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
	display: inline-block;
	outline: none;
	border: none;
	border-radius: 4px;
	color: white;
	font-weight: 800;
	cursor: pointer;
	padding-left: 1rem;
	padding-right: 1rem;

	font-size: 1rem;

	background: ${(props: DivisionProps) =>
		props.isSelect ? "#218c74" : "#2ed573"};
	&:hover {
		background: #7bed9f;
	}
`;

function ButtonList({ divisionList, onToggle }: ISection) {
	const initialList = divisionList.sort((a, b) => (a.id > b.id ? 1 : -1));
	return (
		<>
			{initialList.map((div: DivisionProps) => (
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
