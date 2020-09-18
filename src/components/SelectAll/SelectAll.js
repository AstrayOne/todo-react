import React, { Component } from "react";
import "./SelectAll.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import cn from "classnames";
import PropTypes from "prop-types";
import { selectAll } from "../../actions";

class SelectAll extends Component {
  render() {
    const { isAllSelected, selectAll, todos } = this.props;
    return (
      <div 
      className={cn({
        "select-all": todos.length === 0,
        "select-all select-all_visible": todos.length !== 0,
        "select-all_checked": isAllSelected === true})}
      onClick={() => selectAll()}>
      </div>
    );
  }
}

SelectAll.defaultProps = {
  isAllSelected: false,
  selectAll: () => {},
  todos: [],
};

SelectAll.propTypes = {
  isAllSelected: PropTypes.bool,
  selectAll: PropTypes.func,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      isActive: PropTypes.bool,
    })
  ),
};

const mapStateToProps = (state) => {
  return {
    isAllSelected: state.isAllSelected,
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      selectAll,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAll);