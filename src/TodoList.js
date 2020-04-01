import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTask,
    addTaskAC, addTaskSuccess,
    changeHeaderAC, changeTitle, deleteTask,
    deleteTaskAC, deleteTodo,
    deleteTodolistAC, getTasks,
    setTasksAC,
    setTasksSuccess, updateTask,
    updateTaskAC
} from "./reducer";
import axios from "axios";
import {api} from "./DAL/api";


class TodoList extends React.Component {


    componentDidMount() {
        this.restoreState();
    }


    restoreState = () => {
        this.props.setTasks(this.props.id)
    }


    state = {
        filterValue: "All"
    };
    addTask = (newText) => {
        this.props.addTask(newText, this.props.id)
    }
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }
    changeTask = (task, obj) => {
        debugger
        // this.props.tasks.forEach(t => {
        //     if (t.id === taskId) {
        //         api.changeTask({...t, ...obj}, this.props.id, taskId)
        //             .then(res => {
        //                 if (res.data.resultCode === 0) {
                            this.props.updateTask(task.id, {...task, ...obj}, this.props.id)
                        // }
                    // })
            // }
        // })
    }
    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    }
    changeTitle = (task, title) => {
        this.changeTask(task, {title: title});
    }
    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }
    deleteTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id)
    }
    changeHeader = (title) => {
        this.props.changeHeader(this.props.id, title)
    }

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle changeHeader={this.changeHeader}
                                   id={this.props.id}
                                   title={this.props.title}
                                   onDelete={this.deleteTodolist}/>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                    /*tasks={this.props.tasks.filter(t => {*/
                               tasks={tasks
                                   .filter(t => {
                                       if (this.state.filterValue === "All") {
                                           return true;
                                       }
                                       if (this.state.filterValue === "Active") {
                                           return t.status === 0
                                       }
                                       if (this.state.filterValue === "Completed") {
                                           return t.status === 2
                                       }
                                   })}
                />
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask(task, todolistId) {
            const thunk = addTask(task, todolistId)
            dispatch(thunk);
        },
        setTasks: (todolistId) => {
            const thunk = getTasks(todolistId)
            dispatch(thunk)
            // dispatch(setTasksAC(tasks, todolistId));
        },
        updateTask(taskId, task, todolistId) {
            debugger
            const action = updateTask(taskId, task, todolistId);
            dispatch(action);
        },
        deleteTodolist: (todolistId) => {
            const thunk = deleteTodo(todolistId);
            dispatch(thunk)
        },
        deleteTask: (taskId, todolistId) => {
            const thunk = deleteTask(taskId, todolistId);
            dispatch(thunk)
        },
        changeHeader: (todolistId, title) => {
            const thunk = changeTitle(todolistId, title)
            dispatch(thunk)
        }
    }
}

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;

