import React, {Component} from "react";

class TodoListTitle extends Component {

    state = {
        error: false,
        title:''
    }

    render() {
        return (
                <h3 className="todoList-header__title">{this.props.title}
                <button onClick={this.props.deleteTodoList}>x</button></h3>
        )
    }
}


export default TodoListTitle
