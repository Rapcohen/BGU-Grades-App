import React from "react";
import { GradeForm } from "./components/GradeForm";
import { Grid } from "@mui/material";
import "./App.css";

interface AppProps {}

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
        <GradeForm />
      </Grid>
    </Grid>
  );
};

export default App;
