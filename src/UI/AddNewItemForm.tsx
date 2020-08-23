import React, {ChangeEvent} from 'react';
import './App.css';
import {Button, TextField} from "@material-ui/core";

type PropType = {
    addItem: (newText: string) => void,
    disabledAddTask?: boolean,
    disabledAddTodo?: boolean
    requestStatus?: boolean
}
type StateType = {
    error: boolean,
    title: string
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

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    }

    onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    }


    render = () => {
        let classNameForInput = this.state.error ? "error" : "";
        return (
            <div className="todoList-newTaskForm">
                <TextField error={this.state.error} type="text" placeholder="New item name"
                       onChange={this.onTitleChanged}
                       onKeyPress={this.onKeyPress}
                       value={this.state.title}
                           label='Title'
                           helperText={this.state.error}
                />
                <Button variant='contained' color='primary'
                        disabled={this.props.disabledAddTodo || this.props.disabledAddTask}
                        onClick={this.onAddItemClick}>Add
                </Button>
            </div>
///<Button type="primary">Button</Button>
        );
    }

}

export default AddNewItemForm;

