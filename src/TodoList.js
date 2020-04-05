import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTask,
    changeTitle,
    deleteTask,
    deleteTodo,
    getTasks,
    updateTask
} from "./reducer";


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

    changeTask = (taskId, obj) => {
        debugger
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj};
        this.props.updateTask(this.props.id, taskId, obj, task)
    }
    changeStatus = (taskId, status) => {
        debugger
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
                               preloader={this.props.preloader}
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
        },
        updateTask(todolistId, taskId, obj, task) {
            debugger
            const thunk = updateTask(todolistId, taskId, obj, task);
            dispatch(thunk);
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

