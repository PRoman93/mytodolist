import React, {Component} from "react";

class TodoListTask extends Component {
    onIsDoneChange = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    }
    render() {
        let opacityTask = this.props.task.isDone ? 'todoList-task done' : 'todoList-task'
        return (
            <div className={opacityTask}>
                <input type="checkbox"
                       onChange={this.onIsDoneChange}
                       checked={this.props.task.isDone}/>
                <span>{this.props.task.title}, priority : {this.props.task.priority}</span>
            </div>
        )
    }
}

export default TodoListTask