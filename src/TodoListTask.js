import React from "react";

const TodoListTask = (props) => {
    return(
        <div className="todoList-task">
            <input type="checkbox" checked={props.isDone}/>
            <span>{props.title}, priority : {props.priority}</span>
        </div>
    )
}
export default TodoListTask