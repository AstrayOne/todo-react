import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import cn from "classnames";
import { keys } from "../../variables";
import { changeTodo } from "../../actions";
import "./TodoListItem.css";

class TodoListItem extends Component {
  state = {
    value: this.props.todo.text,
    isEdited: false,
    isCloseVisible: false
  };

  onDoubleClick = () => {
    this.setState({ isEdited: true });
  };

  handleKeyDown = (event) => {
    const { todo, changeTodo } = this.props;
    const { id } = todo;
    const { value } = this.state;

    if (event.keyCode === keys.keyEnter) {
      this.setState({ isEdited: false });
      changeTodo(id, value);
    } else if (event.keyCode === keys.keyEsc) {
      this.setState({ isEdited: false });
    }
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleBlur = () => {
    this.setState({ isEdited: false });

    const { todo, changeTodo } = this.props;
    const { id } = todo;
    const { value } = this.state;
    changeTodo(id, value);
  };

  handleMouseOver = () => {
    this.setState({ isCloseVisible: true });
  };

  handleMouseOut = () => {
    this.setState({ isCloseVisible: false });
  };

  render() {
    const { deleteTodo, checkTodo, todo } = this.props;
    const { text, isActive } = todo;
    const { isEdited, isCloseVisible } = this.state;
    if (isEdited) {
      return (
        <li
          className="todo-item todo-item_edited"
          onMouseEnter={this.handleMouseOver}
          onMouseLeave={this.handleMouseOut}
        >
          <div className="todo-item__check todo-item__check_edited" />
          <input
            type="text"
            className="todo-item__input"
            defaultValue={text}
            autoFocus
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <div className="todo-item__close todo-item__close_edited" />
        </li>
      );
    }

    return (
      <li
        className={cn("todo-item", {
          "todo-item_done": !isActive,
        })}
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
      >
        <div onClick={checkTodo}
          className="todo-item__check" />
        <label
          className={cn("todo-item__label", 
          {"todo-item__label_done": !isActive})}
          onDoubleClick={this.onDoubleClick}>
          {text}
        </label>
        <div onClick={deleteTodo}
          className={cn("todo-item__close",
          {"todo-item__close_visible": isCloseVisible})} />
      </li>
    );
  }
}

TodoListItem.defaultProps = {
  checkTodo: () => {},
  deleteTodo: () => {},
  changeTodo: () => {},
  todo: {
    id: 0,
    text: "",
    isActive: true,
  },
};

TodoListItem.propTypes = {
  checkTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  changeTodo: PropTypes.func,
  todo: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    isActive: PropTypes.bool,
  }),
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeTodo,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(TodoListItem);
