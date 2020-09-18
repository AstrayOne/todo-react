import React, { Component } from "react";
import "./Input.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { addTodo } from "../../actions";
import { keys } from "../../variables";

class Input extends Component {
  handleKeyEnter = (event) => {
    const { addTodo } = this.props;
    if (event.keyCode === keys.keyEnter && event.target.value) {
      addTodo(event.target.value);
      event.target.value = "";
    }
  };

  handleOnBlur = (event) => {
    if (event.target.value) {
      const { addTodo } = this.props;
      addTodo(event.target.value);
      event.target.value = "";
    }
  };

  render() {
    return (
      <input
        type="text"
        onKeyDown={this.handleKeyEnter}
        onBlur={this.handleOnBlur}
        className="new-todo"
        placeholder="What needs to be done?"
      />
    );
  }
}

Input.defaultProps = {
  addTodo: PropTypes.instanceOf(Function),
};

Input.propTypes = {
  addTodo: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addTodo,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Input);
