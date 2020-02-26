import React, {Component} from "react";

class TodoListTask extends Component {
    onIsDoneChange = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    }
    render() {
        return (
            <div className="todoList-task">
                <input type="checkbox"
                       onChange={this.onIsDoneChange}
                       checked={this.props.task.isDone}/>
                <span>{this.props.task.title}, priority : {this.props.task.priority}</span>
            </div>
        )
    }
}

export default TodoListTask