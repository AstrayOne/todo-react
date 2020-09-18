export const addTodo = (text) => {
  return {
    type: "ADD_TODO",
    text,
  };
};

export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    id,
  };
};

export const checkTodo = (id) => {
  return {
    type: "CHECK_TODO",
    id,
  };
};

export const changeTodo = (id, text) => {
  return {
    type: "CHANGE_TODO",
    id,
    text,
  };
};

export const clearCompleted = () => {
  return {
    type: "CLEAR_COMPLETED",
  };
};

export const changeMode = (mode) => {
  return {
    type: "CHANGE_MODE",
    mode,
  };
};

export const selectAll = () => {
  return {
    type: "SELECT_ALL",
  };
};

export const loadTodos = () => {
  return {
    type: "LOAD_TODOS",
  };
};
