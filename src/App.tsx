import React from "react";
import "./App.css";
import InputSection from "./component/InputSection";
import styled from "styled-components";
import Logo from "./img/Logo.png";

const Root: any = styled.body`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100vh;
	background-color: #f5f6fa;
`;

const ImageLogo: any = styled.img`
	width: 15rem;
	height: 5rem;
	margin-top: 3rem;
	margin-right: 3rem;
`;

function App() {
	return (
		<Root>
			<ImageLogo src={Logo}></ImageLogo>
			<InputSection></InputSection>
		</Root>
	);
}

export default App;
