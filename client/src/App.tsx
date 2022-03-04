import React from "react";
import "./App.css";
import Form from "./components/Form";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="app-container">
      <h1>BGU Grades</h1>
      <Form />
    </div>
  );
};

export default App;
