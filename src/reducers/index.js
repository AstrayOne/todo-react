const initialState = {
  mode: "All",
  isAllSelected: false,
  lastId: 0,
  todos: [],
};

function Todo(id, text, isActive) {
  this.id = id;
  this.text = text;
  this.isActive = isActive;
}

const SaveData = (state) => {
  localStorage.clear();
  state.todos.forEach((current, index) => {
    localStorage[index] = JSON.stringify(current);
  });
};

const loadTodos = (state) => {
  let item, newItem, todos, lastId;
  todos = [];

  for (let i = 0; i < localStorage.length; i += 1) {
    item = JSON.parse(localStorage[i]);
    newItem = new Todo(item.id, item.text, item.isActive);
    todos.push(newItem);
  }

  todos.length > 0 ? (lastId = todos[todos.length - 1].id) : (lastId = 0);

  return {
    ...state,
    lastId,
    todos,
  };
};

const addTodo = (state, text) => {
  const newLastId = state.lastId + 1;
  const newItem = new Todo(newLastId, text, true);
  const newTodos = [...state.todos, newItem];

  const newIsAllSelected = checkSelectAll(newTodos);

  const newState = {
    ...state,
    isAllSelected: newIsAllSelected,
    lastId: newLastId,
    todos: newTodos,
  };

  SaveData(newState);

  return newState;
};

const deleteTodo = (state, todoId) => {
  let newIsAllSelected;

  const todoIndex = state.todos.findIndex(({ id }) => id === todoId);

  const newTodos = [
    ...state.todos.slice(0, todoIndex),
    ...state.todos.slice(todoIndex + 1),
  ];

  newIsAllSelected = checkSelectAll(newTodos);

  const newState = {
    ...state,
    isAllSelected: newIsAllSelected,
    lastId: state.lastId,
    todos: newTodos,
  };

  SaveData(newState);
  return newState;
};

const checkTodo = (state, todoId) => {
  const todo = state.todos.find(({ id }) => id === todoId);
  const todoIndex = state.todos.findIndex(({ id }) => id === todoId);

  todo.isActive = !todo.isActive;

  const newTodos = [
    ...state.todos.slice(0, todoIndex),
    todo,
    ...state.todos.slice(todoIndex + 1),
  ];

  const newIsAllSelected = checkSelectAll(newTodos);

  const newState = {
    mode: state.mode,
    isAllSelected: newIsAllSelected,
    lastId: state.lastId,
    todos: newTodos,
  };

  SaveData(newState);

  return newState;
};

const checkSelectAll = (newTodos) => {
  let newIsAllSelected;

  newTodos.some((todo) => {
    return todo.isActive;
  })
    ? (newIsAllSelected = false)
    : (newIsAllSelected = true);

  if (newTodos.length === 0) newIsAllSelected = false;

  return newIsAllSelected;
};

const changeTodo = (state, todoId, text) => {
  const todo = state.todos.find(({ id }) => id === todoId);
  const todoIndex = state.todos.findIndex(({ id }) => id === todoId);

  todo.text = text;

  const newState = {
    ...state,
    todos: [
      ...state.todos.slice(0, todoIndex),
      todo,
      ...state.todos.slice(todoIndex + 1),
    ],
  };
  SaveData(newState);

  return newState;
};

const clearCompleted = (state) => {
  const newTodos = [];

  state.todos.forEach((element) => {
    if (element.isActive === true) {
      newTodos.push(element);
    }
  });

  const newIsAllSelected = checkSelectAll(newTodos);

  const newState = {
    mode: state.mode,
    isAllSelected: newIsAllSelected,
    lastId: state.lastId,
    todos: newTodos,
  };

  SaveData(newState);

  return newState;
};

const changeMode = (state, mode) => {
  const newState = {
    mode,
    isAllSelected: state.isAllSelected,
    lastId: state.lastId,
    todos: state.todos,
  };

  SaveData(newState);

  return newState;
};

const selectAll = (state) => {
  const newState = {
    mode: state.mode,
    isAllSelected: !state.isAllSelected,
    lastId: state.lastId,
    todos: state.todos.map((todo) => {
      if (state.isAllSelected === false) {
        todo.isActive = false;
      } else {
        todo.isActive = true;
      }
      return todo;
    }),
  };

  SaveData(newState);

  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return addTodo(state, action.text);

    case "DELETE_TODO":
      return deleteTodo(state, action.id);

    case "CHECK_TODO":
      return checkTodo(state, action.id);

    case "CLEAR_COMPLETED":
      return clearCompleted(state);

    case "CHANGE_TODO":
      return changeTodo(state, action.id, action.text);

    case "CHANGE_MODE":
      return changeMode(state, action.mode);

    case "SELECT_ALL":
      return selectAll(state);

    case "LOAD_TODOS":
      return loadTodos(state);

    default:
      return state;
  }
};

export default reducer;
