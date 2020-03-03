import React, {Component} from "react";

class TodoListTask extends Component {

    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }
    onIsDoneChange = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
    }
    onTaskChange = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    }
    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    }
    render() {
        let opacityTask = this.props.task.isDone ? 'todoList-task done' : 'todoList-task'
        return (
            <div className={opacityTask}>
                <input type="checkbox"
                       onChange={this.onIsDoneChange}
                       checked={this.props.task.isDone}/>
                {this.props.task.id} -
                 {this.state.editMode
                    ? <input value={this.props.task.title} autoFocus={true} onBlur={this.deactivateEditMode} onChange={this.onTaskChange}/>
                    : <span onClick={this.activateEditMode}> {this.props.task.title}</span>}
                <span> , priority : {this.props.task.priority} <button onClick={this.onDeleteTask}>x</button></span>
            </div>
        )
    }
}
export default TodoListTask