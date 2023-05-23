import React from "react";
import './App.css';
import ComponentFromHtml from "./components/ComponentFromHtml";
import Test from "./components/Test";

function App() {

  const data = {
    name: "лапша",
    weight: "42кг",
  }

  return (
    <ComponentFromHtml filePath={"assets/templates/test2.html"} data={data}>
      <Test/>
    </ComponentFromHtml>
  );
}

export default App;
