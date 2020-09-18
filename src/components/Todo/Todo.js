import React from "react";
import "./Todo.css";
import Input from "../Input/Input";
import SelectAll from "../SelectAll/SelectAll";
import TodoList from "../TodoList/TodoList";

function Todo() {
  return (
    <div className="todo">
      <Input />
      <SelectAll />
      <TodoList />
    </div>
  );
}

export default Todo;
