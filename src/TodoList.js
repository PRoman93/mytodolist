import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm'
import TodoListTasks from './TodoListTasks'
import TodoListFooter from './TodoListFooter'
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC, deleteTodoListAC, setTasksAC} from "./reducer";
import axios from "axios";

class TodoList extends React.Component {

    state = {
        filterValue: 'All'
    };
    nextItemId = 1

    componentDidMount() {
        this._restoreState()
    }

    _restoreState = () => {
        let todolistId = this.props.id
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {
            withCredentials: true,
            headers: {'API-KEY': 'cde98104-6e07-4290-87b8-6584c1b2a239'}
        })
            .then(res => {
                let tasks = res.data.items
                // debugger
                // console.log(res.data);
                this.props.setTasks(tasks, todolistId)
            });
        // this.nextItemId++
        // this.props.addTodoList(newTodoList)
    }


    addTask = (newText) => {
        let todolistId = this.props.id
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,  {title: newText}, {
            withCredentials: true,
            headers: {'API-KEY': 'cde98104-6e07-4290-87b8-6584c1b2a239'}
        })
            .then(res => {
                let newTask = res.data.data.item
                console.log(res.data);
                this.props.addTask(newTask, this.props.id)
            });
    }
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    }
    changeTask = (task, status) => {
        let todoListId = this.props.id
        let taskId = task.id
        let newTask = {...task, status: status === true ? 2 : 0 }
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${taskId}`, newTask, {
            withCredentials: true,
            headers: {'API-KEY': 'cde98104-6e07-4290-87b8-6584c1b2a239'}
        })
            .then(res => {
                if (res.data.resultCode === 0) {
                    debugger
                    // console.log(res.data)
                    this.props.changeTask(res.data.data.item)
                }
            });
    }
    changeStatus = (task, status) => {
        debugger
        this.changeTask(task, status)
    }
    changeTitle = (task, title) => {
        this.changeTask(task, {title: title})
    }
    deleteTodoList = () => {
        let todoListId = this.props.id
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, {
            withCredentials: true,
            headers: {'API-KEY': 'cde98104-6e07-4290-87b8-6584c1b2a239'}
        })
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.deleteTodoList(todoListId)
                }


            });
        // this.nextItemId++
        // this.props.addTodoList(newTodoList)
    }
    deleteTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id)
    }
    render = () => {
        let {tasks = []} = this.props
        return (
            <div className="todoList">
                <div className='todoList-header'>
                    <TodoListTitle title={this.props.title} deleteTodoList={this.deleteTodoList}/>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                               tasks={tasks.filter(t => {
                                   switch (this.state.filterValue) {
                                       case "All":
                                           return t;
                                       case "Completed":
                                           return t.isDone;
                                       case "Active":
                                           return !t.isDone
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask(newText, todoListId) {
            dispatch(addTaskAC(newText, todoListId))
        },
        setTasks(tasks, todoListId) {
            dispatch(setTasksAC(tasks, todoListId))
        },
        changeTask(task) {
            debugger
            dispatch(changeTaskAC(task))
        },
        deleteTodoList: (todoListId) => {
            dispatch(deleteTodoListAC(todoListId))
        },
        deleteTask: (taskId, todoListId) => {
            dispatch(deleteTaskAC(taskId, todoListId))
        }
    }
}
const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList)
export default ConnectedTodoList;

