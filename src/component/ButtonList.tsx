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
	padding-top: 0.4rem;

	margin-bottom: 1rem;

	height: 2.25rem;
	font-size: 1rem;

	background: ${(props: DivisionProps) =>
		props.isSelect ? "#218c74" : "#2ed573"};
	&:hover {
		background: #7bed9f;
	}
	&:active {
		background: ;
	}

	& + & {
		margin-left: 1rem;
	}
`;

function ButtonList({ divisionList, onToggle }: ISection) {
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
