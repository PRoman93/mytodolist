import React, {ChangeEvent} from 'react';
import './App.css';

type PropType = {
    addItem:(newText:string)=>void,
    disabledAddTask?:boolean,
    disabledAddTodo?:boolean
    requestStatus?:boolean
}
type StateType = {
    error:boolean,
    title:string
}
class AddNewItemForm extends React.Component<PropType, StateType> {
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
            this.props.addItem(newText);
        }
    }

    onTitleChanged = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    }

    onKeyPress = (e:React.KeyboardEvent<HTMLDivElement>) => {
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
                    disabled={this.props.disabledAddTodo || this.props.disabledAddTask}
                    onClick={this.onAddItemClick}>Add
                </button>
            </div>

        );
    }
}

export default AddNewItemForm;

