import React, {Component} from "react";
import TodoListTask from "./TodoListTask";

class TodoListTasks extends Component {
    render() {

        let tasksElements = this.props.tasks.map(task => <TodoListTask task={task}
                                                                       changeStatus={this.props.changeStatus}
                                                                       deleteTask={this.props.deleteTask}
                                                                       changeTitle={this.props.changeTitle}/>)

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        )
    }
}

export default TodoListTasks

