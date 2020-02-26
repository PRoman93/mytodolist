import React, {Component} from "react";
import TodoListTask from "./TodoListTask";

class TodoListTasks extends Component {
    render() {

        let tasksElements = this.props.tasks.map(task => <TodoListTask task={task}
                                                                       changeStatus={this.props.changeStatus}/>)

        // let tasksElements = [
        //     <TodoListTask title={this.props.tasks[0].title} isDone={this.props.tasks[0].isDone}/>,
        //     <TodoListTask title={this.props.tasks[1].title} isDone={this.props.tasks[1].isDone}/>,
        //     <TodoListTask title={this.props.tasks[2].title} isDone={this.props.tasks[2].isDone}/>,
        //     <TodoListTask title={this.props.tasks[3].title} isDone={this.props.tasks[3].isDone}/>
        // ]

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        )
    }
}

export default TodoListTasks

