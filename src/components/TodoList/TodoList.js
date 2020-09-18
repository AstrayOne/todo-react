import React, { Component } from "react";
import "./TodoList.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { deleteTodo, checkTodo, loadTodos } from "../../actions";
import TodoListItem from "../TodoListItem/TodoListItem";

class TodoList extends Component {
  componentWillMount() {
    const { loadTodos } = this.props;
    loadTodos();
  }

  filterTodos = (todos) => {
    const filteredTodos = [];
    const { mode } = this.props;
    switch (mode) {
      case "All":
        return todos;

      case "Active":
        todos.forEach((todo) => {
          if (todo.isActive === true) filteredTodos.push(todo);
        });
        return filteredTodos;

      case "Completed":
        todos.forEach((todo) => {
          if (todo.isActive === false) filteredTodos.push(todo);
        });
        return filteredTodos;
      default:
        break;
    }
    return filteredTodos;
  };

  render() {
    const { todos, deleteTodo, checkTodo } = this.props;
    const filteredTodos = this.filterTodos(todos);
    return (
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              deleteTodo={() => deleteTodo(todo.id)}
              checkTodo={() => checkTodo(todo.id)}
            />
          );
        })}
      </ul>
    );
  }
}

TodoList.defaultProps = {
  deleteTodo: () => {},
  checkTodo: () => {},
  loadTodos: () => {},
  todos: [],
  mode: "",
};

TodoList.propTypes = {
  deleteTodo: PropTypes.func,
  checkTodo: PropTypes.func,
  loadTodos: PropTypes.func,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      isActive: PropTypes.bool,
    })
  ),
  mode: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    mode: state.mode,
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      deleteTodo,
      checkTodo,
      loadTodos,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
