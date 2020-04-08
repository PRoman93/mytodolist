import React from 'react';
import './App.css';

class TodoListTitle extends React.Component {

    state = {
        editMode: false,
        title: this.props.title
    }
    onEditTitleMode = () => {
        this.setState({
            editMode: true
        })
    }
    onChangeHeader = (e) => {
        // debugger
        this.setState({
            title: e.currentTarget.value
        })
    }
    changeHeader = () => {
        if (this.state.title === '') {
            this.setState({
                editMode: true
            })
        } else {
            this.props.changeHeader(this.state.title)
            this.setState({editMode: false})
        }

    }
    render = () => {
        return (
            <>
                {!this.state.editMode &&
                <h3 onDoubleClick={this.onEditTitleMode}
                    className="todoList-header__title">{this.state.title}
                    <button onClick={this.props.onDelete}>X</button>
                </h3>}

                {this.state.editMode && <input type="text"
                                               autoFocus={true}
                                               value={this.state.title}
                                               onBlur={this.changeHeader}
                                               onChange={this.onChangeHeader}/>}

            </>
        )
    }
}

export default TodoListTitle;

