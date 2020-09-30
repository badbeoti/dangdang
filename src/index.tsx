import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyle from "./styles/global-styles";

ReactDOM.render(
	<>
		<GlobalStyle />
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</>,
	document.getElementById("root")
);
