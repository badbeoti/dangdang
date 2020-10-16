import React from "react";
import "./App.css";
import InputSection from "./component/InputSection";
import styled from "styled-components";

const Root: any = styled.body`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100vh;
	background-color: #f5f6fa;
`;

function App() {
	return (
		<Root>
			<InputSection></InputSection>
		</Root>
	);
}

export default App;
