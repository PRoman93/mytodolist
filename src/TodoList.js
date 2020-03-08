import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm'
import TodoListTasks from './TodoListTasks'
import TodoListFooter from './TodoListFooter'
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC, deleteTodoListAC} from "./reducer";

class TodoList extends React.Component {

    state = {
        filterValue: 'All'
    };
    nextItemId = 1
    addTask = (newText) => {
        let newTask = {
            id: this.nextItemId,
            title: newText,
            isDone: false,
            priority: 'low'
        }
        this.nextItemId++
        this.props.addTask(newTask, this.props.id)
    }
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    }
    changeTask = (taskId, obj) => {
        this.props.changeTask(this.props.id, taskId, obj)
    }
    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    }
    deleteTodoList = () => {
        this.props.deleteTodoList(this.props.id)
    }
    deleteTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id)
    }
    render = () => {
        return (
            <div className="todoList">
                <div className='todoList-header'>
                    <TodoListTitle title={this.props.title} deleteTodoList={this.deleteTodoList}/>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                               tasks={this.props.tasks.filter(t => {
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
        addTask(newTask, todoListId) {
            dispatch(addTaskAC(newTask, todoListId))
        },
        changeTask(todoListId, taskId, obj) {
            dispatch(changeTaskAC(todoListId, taskId, obj))
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

