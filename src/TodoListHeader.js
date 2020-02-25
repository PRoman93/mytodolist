import React from "react";

const TodoListHeader = (props) => {
    return (
        <div className="todoList-header">
            <h3 className="todoList-header__title">What to Learn</h3>
            <div className="todoList-newTaskForm">
                <input type="text" placeholder="New task name"/>
                <button>Add</button>
            </div>
        </div>
    )
}
export default TodoListHeader
