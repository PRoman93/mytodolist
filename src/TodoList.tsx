import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTask, changeTitle, deleteTask, deleteTodo, getTasks, updateTask} from "./BLL/reducer";
import Preloader from "./Preloader";
import {TaskType, TodoListType} from "./types/entities";


type PropType = {
    setTasks: (todolistId: string) => void,
    addTask: (newText: string, todolistId: string) => void,
    updateTask: (todolistid: string, taskId: string, obj: any, task: TaskType) => void,
    deleteTodolist: (todolistId: string) => void,
    deleteTask: (taskId: string, todolistid: string) => void,
    changeHeader: (todolistId: string, title: string) => void,
    id: string,
    title: string,
    preloader: boolean,
    tasks: Array<TaskType>,
    todolists: TodoListType[]
    disabled?: boolean
    disabledDeleteTodolist?:boolean
    // disabledTodo:boolean
}
type StateType = {
    filterValue: string
}

class TodoList extends React.Component<PropType, StateType> {

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.setTasks(this.props.id)
    }

    state = {
        filterValue: "All"
    };
    addTask = (newText: string) => {
        this.props.addTask(newText, this.props.id)
    }
    changeFilter = (newFilterValue: string) => {
        this.setState({
            filterValue: newFilterValue
        });
    }

    changeTask = (taskId: string, obj: any) => {
        let changedTask = this.props.tasks.find((task: TaskType) => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj};
        this.props.updateTask(this.props.id, taskId, obj, task)
    }
    changeStatus = (taskId: string, status: number) => {
        this.changeTask(taskId, {status: status});
    }
    changeTitle = (task: string, title: string) => {
        this.changeTask(task, {title: title});
    }
    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }
    deleteTask = (taskId: string) => {
        this.props.deleteTask(taskId, this.props.id)
    }
    changeHeader = (title: string) => {
        this.props.changeHeader(this.props.id, title)
    }

    render = () => {
        let {tasks = []} = this.props;
        // console.log(this.props.disabledDeleteTodolist)
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle changeHeader={this.changeHeader}
                                   disabledDeleteTodolist={this.props.disabledDeleteTodolist}
                                   title={this.props.title}
                                   onDelete={this.deleteTodolist}/>
                    <AddNewItemForm
                        disabledAddTask={this.props.disabled}
                        addItem={this.addTask}/>
                </div>
                {this.props.preloader
                    ? <Preloader preloader={'preloader'}/>
                    : <TodoListTasks changeStatus={this.changeStatus}
                                     changeTitle={this.changeTitle}
                                     deleteTask={this.deleteTask}
                                     preloader={this.props.preloader}
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
                    />}
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addTask(task: string, todolistId: string) {
            const thunk = addTask(task, todolistId)
            dispatch(thunk);
        },
        setTasks: (todolistId: string) => {
            const thunk = getTasks(todolistId)
            dispatch(thunk)
        },
        updateTask(todolistId: string, taskId: string, obj: any, task: TaskType) {
            const thunk = updateTask(todolistId, taskId, obj, task);
            dispatch(thunk);
        },
        deleteTodolist: (todolistId: string) => {
            const thunk = deleteTodo(todolistId);
            dispatch(thunk)
        },
        deleteTask: (taskId: string, todolistId: string) => {
            const thunk = deleteTask(taskId, todolistId);
            dispatch(thunk)
        },
        changeHeader: (todolistId: string, title: string) => {
            const thunk = changeTitle(todolistId, title)
            dispatch(thunk)
        }
    }
}
const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodolist;

