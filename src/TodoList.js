import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskAC,
    changeHeaderAC,
    deleteTaskAC,
    deleteTodolistAC, getTasks,
    setTasksAC,
    setTasksSuccess,
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
        let todolistId = this.props.id
        api.createTask(newText, todolistId)
            .then(res => {
                this.props.addTask(res.data.data.item)
            })
    }
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }
    changeTask = (taskId, obj) => {
        this.props.tasks.forEach(t => {
            if (t.id === taskId) {
                api.changeTask({...t, ...obj}, this.props.id, taskId)
                    .then(res => {
                        if (res.data.resultCode === 0) {
                            this.props.updateTask(taskId, obj, this.props.id)
                        }
                    })
            }
        })
    }
    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    }
    changeTitle = (task, title) => {
        this.changeTask(task, {title: title});
    }
    deleteTodolist = () => {
        api.deleteTodolist(this.props.id)
            .then(res => {
                this.props.deleteTodolist(this.props.id)
            })
    }
    deleteTask = (taskId) => {
        api.deleteTask(taskId, this.props.id)
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.deleteTask(taskId, this.props.id)
                }
            })
    }
    changeHeader = (title) => {
        debugger
        api.changeHeader(this.props.id, title)
            .then(res => {
                debugger
                if (res.data.resultCode === 0) {
                    // debugger
                    this.props.changeHeader(this.props.id, title)
                }
            })
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
        addTask(task) {
            dispatch(addTaskAC(task));
        },
        setTasks: (todolistId) => {
            debugger
            const thunk = getTasks(todolistId)
            dispatch(thunk)
            // dispatch(setTasksAC(tasks, todolistId));
        },
        updateTask(taskId, obj, todolistId) {
            const action = updateTaskAC(taskId, obj, todolistId);
            dispatch(action);
        },
        deleteTodolist: (todolistId) => {
            const action = deleteTodolistAC(todolistId);
            dispatch(action)
        },
        deleteTask: (taskId, todolistId) => {
            const action = deleteTaskAC(taskId, todolistId);
            dispatch(action)
        },
        changeHeader: (todolistId, title) => {
            debugger
            const action = changeHeaderAC(todolistId, title)
            dispatch(action)
        }
    }
}

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;

