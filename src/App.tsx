import React from "react";
import "./App.css";
import { Todo } from "./Todo";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Todo />
      </header>
    </div>
  );
};

export default App;
