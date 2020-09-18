import React from "react";
import "./App.css";
import Header from "../Header/Header";
import Todo from "../Todo/Todo";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <Todo />
      <Footer />
    </div>
  );
}

export default App;
