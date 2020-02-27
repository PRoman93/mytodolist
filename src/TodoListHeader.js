import React, {Component} from "react";

class TodoListHeader extends Component {

    state = {
        error: false,
        title:''
    }
    onAddTaskClick = () => {
        let newText = this.state.title
        this.state.title = ''
        if (newText === '') {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false
            })
            this.props.addTask(newText)
        }
    }
    onKeyPress = (e) => {
        if(e.key === 'Enter')
        this.onAddTaskClick()
    }
    onTitleChange = (e) => {
        let newValue = e.currentTarget.value
        this.setState({
            title:newValue,
            error:false
        })
    }

    render() {
        let error = this.state.error ? 'error' : ''
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">{this.props.title}</h3>
                <div className="todoList-newTaskForm">
                    <input className={error}
                           value={this.state.title}
                           onKeyPress={this.onKeyPress}
                           onChange={this.onTitleChange}
                           type="text"
                           placeholder="New task name"/>
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        )
    }
}

export default TodoListHeader
