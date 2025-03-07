import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/query";
import LOGIN_LOGOUT from "./components/Login-Logout";
import Project from "./components/Project";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:auth" element={<LOGIN_LOGOUT />} />
					<Route path="project" element={<Project />} />
					<Route path="project/:title" element={<Project />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
);

reportWebVitals();
