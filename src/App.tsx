import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodo, getTodo} from "./reducer";
import Preloader from "./Preloader";
import {InitialStateType, TodoListType} from "./types/entities";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    todolists: Array<TodoListType>,
    preloader: boolean,
    disabled: boolean,
    disabledDeleteTodolist: boolean,
    disabledDeleteTask: boolean,
}
type MapDispatchToProps = {
    setTodolists: () => void,
    addTodolist: (newTodolist: string) => void
}

class App extends React.Component<MapStateToPropsType & MapDispatchToProps> {

    // state = {
    //     todolists: []
    // }

    addTodoList = (newTodolist: string) => {
        this.props.addTodolist(newTodolist)
    }

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.setTodolists()
    }

    render = () => {
        const todolists = this.props
            .todolists
            .map(tl => <TodoList disabledDeleteTodolist={this.props.disabledDeleteTodolist}
                                 disabledDeleteTask={this.props.disabledDeleteTask}
                                 key={tl.id}
                                 id={tl.id}
                                 title={tl.title}
                                 tasks={tl.tasks}
                                 todolists={tl}/>)

        return (
            <>
                {
                    this.props.preloader
                        ? <Preloader/>
                        : <>
                            <div>
                                <AddNewItemForm addItem={this.addTodoList}
                                                disabled={this.props.disabled}
                                />
                            </div>
                            <div className="App">
                                {todolists}
                            </div>
                        </>
                }
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        todolists: state.todolist.todolists,
        preloader: state.todolist.preloader,
        disabled: state.todolist.disabled,
        disabledDeleteTodolist: state.todolist.disabledDeleteTodolist,
        disabledDeleteTask: state.todolist.disabledDeleteTask
    }
}

const mapDispatchToProps = (dispatch: any): MapDispatchToProps => { //
    return {
        setTodolists: () => {
            const thunk = getTodo();
            dispatch(thunk)
        },
        addTodolist: (newTodolist: string) => {
            const thunk = addTodo(newTodolist);
            dispatch(thunk)
        }
    }
}

const ConnectedApp = connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

