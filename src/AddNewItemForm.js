import React from 'react';
import './App.css';
import {STATUSES} from "./reducer";

class AddNewItemForm extends React.Component {
    state = {
        error: false,
        title: ""
    }

    onAddItemClick = () => {
        let newText = this.state.title;
        this.setState({title: ""});

        if (newText === "") {
            this.setState({error: true});
        } else {
            this.setState({error: false});
            // передаём новый текст наружу
            this.props.addItem(newText);
        }
    }

    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    }


    render = () => {
        let classNameForInput = this.state.error ? "error" : "";
        return (
            <div className="todoList-newTaskForm">
                <input className={classNameForInput} type="text" placeholder="New item name"
                       onChange={this.onTitleChanged}
                       onKeyPress={this.onKeyPress}
                       value={this.state.title}
                />
                <button
                    disabled={this.props.disabledTodo || this.props.disabled}
                    onClick={this.onAddItemClick}>Add
                </button>
            </div>

        );
    }
}

{/*{this.props.requestStatus === STATUSES.PENDING}*/
}
export default AddNewItemForm;

