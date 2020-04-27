import React, {ChangeEvent} from 'react';
import './App.css';
import Preloader from "./accets/Preloader";
import {TaskType} from "./types/entities";
import {fchmod} from "fs";

type PropType = {
    changeStatus: (taskId: string, status: number) => void,
    changeTitle: (taskId: string, title: string) => void,
    deleteTask: (taskId: string) => void,
    task: TaskType,
    preloader:boolean
}
type StateType = {
    editMode: boolean,
    title: string
}

class TodoListTask extends React.Component<PropType, StateType> {

    onIsDoneChanged = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, status);
    }

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value});
    }

    state = {
        editMode: false,
        title: this.props.task.title
    }

    activateEditMode = () => {
        this.setState({editMode: true});
    }

    deactivateEditMode = () => {
        this.props.changeTitle(this.props.task.id, this.state.title)
        this.setState({editMode: false});
    }
    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    }
    render = () => {
        let containerCssClass = this.props.task.status === 2 ? "todoList-task done" : "todoList-task";
        let priorityTitle = "";
        switch (this.props.task.priority) {
            case 0:
                priorityTitle = "Low";
                break;
            case 1:
                priorityTitle = "Middle";
                break;
            case 2:
                priorityTitle = "High";
                break;
            case 3:
                priorityTitle = "Urgently";
                break;
            case 4:
                priorityTitle = "Later";
                break;
        }
        return (
            <>
                <div className={containerCssClass}>
                    <input type="checkbox" checked={this.props.task.status === 2}
                           onChange={this.onIsDoneChanged}/>
                    {this.state.editMode
                        ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                                 value={this.state.title}/>
                        : <span onClick={this.activateEditMode}>{this.state.title}</span>
                    }, priority: {priorityTitle}
                    <button disabled={this.props.task.disabledDeleteTask} onClick={this.onDeleteTask}>X</button>
                </div>
            </>
        );
    }
}
export default TodoListTask;

