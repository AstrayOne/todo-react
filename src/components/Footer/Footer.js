import React, { Component } from "react";
import "./Footer.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import cn from "classnames";
import PropTypes from "prop-types";
import { clearCompleted, changeMode } from "../../actions";

class Footer extends Component {
  leftCounter = () => {
    let counter = 0;
    const { todos } = this.props;
    todos.forEach((todo) => {
      if (todo.isActive === true) counter += 1;
    });
    return counter;
  };

  render() {
    const { mode, clearCompleted, changeMode, todos } = this.props;

    return (
      todos.length !== 0 && (
        <div className="footer footer_visible">
          <span className="counter">{`${this.leftCounter()} items left`}</span>
          <div 
            onClick={() => changeMode("All")}
            onKeyDown={() => {}}
            className={cn("button button_all",
            {"button_selected": mode === "All"})}>
            All
          </div>
          <div 
            onClick={() => changeMode("Active")}
            className={cn("button button_active",
            {"button_selected": mode === "Active"})}>
            Active
          </div>
          <div 
            onClick={() => changeMode("Completed")}
            className={cn("button button_completed",
            {"button_selected": mode === "Completed"})}>
            Completed</div>
          <div 
            className="button button_clear-сompleted"
            onClick={clearCompleted}>
            Clear completed
          </div>
        </div>
      )
    );
  }
}

Footer.defaultProps = {
  todos: [],
  mode: "",
  clearCompleted: () => {},
  changeMode: () => {},
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      isActive: PropTypes.bool,
    })
  ),
  mode: PropTypes.string,
  clearCompleted: PropTypes.func,
  changeMode: PropTypes.func,
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
      clearCompleted,
      changeMode,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
