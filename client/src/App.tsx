import React from "react";
import { GradeForm } from "./components/GradeForm";
import GradeFormValues from "./interfaces/GradeFormValues";
import { Grid } from "@mui/material";
import "./App.css";

interface AppProps {}

async function getGradesFromBGU(values: GradeFormValues): Promise<void> {
	try {
		const requestUrl = `/grades/${values.year}/${values.semester}/${values.courseId}`;
		const response: Response = await fetch(requestUrl);

		if (response.ok) {
			const pdfData: string = await response.text();
			const blob: Blob = new Blob([pdfData], { type: "application/pdf" });
			const url: string = URL.createObjectURL(blob);
			window.open(url, "_blank");
			return;
		}
	} catch (error) {
		console.log(error);
	}
}

const App: React.FC<AppProps> = () => {
	return (
		<Grid
			container
			direction="column"
			alignContent="center"
			justifyContent="center"
			style={{ height: "100vh" }}
		>
			<Grid item textAlign="center">
				<h1>BGU Grades</h1>
			</Grid>
			<Grid item>
				<GradeForm onSubmit={getGradesFromBGU} />
			</Grid>
		</Grid>
	);
};

export default App;
