import React, { ReactNode } from "react";
import styled from "styled-components";

interface DivisionProps {
	name: string;
	id?: number;
	isSelect: boolean;
}

interface IProps extends DivisionProps {
	onToggle: (key: number) => void;
	children: ReactNode;
}

const StyledButton: any = styled.button`
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
	background: ${(props: DivisionProps) => (props.isSelect ? "orange" : "blue")};
	&:hover {
		background: #339af0;
	}
	&:active {
		background: ;
	}

	/* 기타 */
	& + & {
		margin-left: 1rem;
	}
`;

function Button({ children }: IProps) {
	return <StyledButton>{children}</StyledButton>;
}

function ButtonList({ divisionList }, { onToggle }: IProps) {
	console.log(Button);
	return (
		<>
			{divisionList.map((div: DivisionProps) => (
				<Button
					name={div.name}
					children={div.name}
					isSelect={div.isSelect}
					key={div.id}
					onToggle={onToggle}
				></Button>
			))}
		</>
	);
}

export default ButtonList;
