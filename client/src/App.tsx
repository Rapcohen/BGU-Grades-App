import React from "react";
import { GradeForm } from "./components/GradeForm";
import GradeFormValues from "./interfaces/GradeFormValues";
import "./App.css";

interface AppProps { }

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
    <div className="app-container">
      <div className="form-container">
        <h1>BGU Grades</h1>
        <GradeForm onSubmit={getGradesFromBGU} />
      </div>
    </div>
  );
};

export default App;
