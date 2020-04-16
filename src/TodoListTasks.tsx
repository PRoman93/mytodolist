import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";
import {TaskType} from "./types/entities";

type PropType = {
    tasks:Array<TaskType>,
    changeStatus:(taskId:string, status:number)=>void,
    changeTitle:(taskId:string, title:string)=>void,
    deleteTask:(taskId:string)=>void,
    preloader:boolean
}
class TodoListTasks extends React.Component<PropType> {
    render = () => {

        let tasksElements = this.props.tasks.map( task => <TodoListTask key={task.id} task={task}
                                                                        changeStatus={this.props.changeStatus}
                                                                        changeTitle={this.props.changeTitle}
                                                                        // changeHeader={this.props.changeHeader}
                                                                        deleteTask={this.props.deleteTask}
                                                                        preloader={this.props.preloader}
                                                                        />);

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

