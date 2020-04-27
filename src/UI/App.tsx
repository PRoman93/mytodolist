import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./UI/AddNewItemForm";
import {connect} from "react-redux";
import {addTodo, getTodo} from "./BLL/reducer";
import Preloader from "./Preloader";
import {TodoListType} from "./types/entities";
import {AppStateType} from "./BLL/store";


type MapStateToPropsType = {
    todolists: Array<TodoListType>,
    preloader: boolean,
    disabled: boolean,
    disabledDeleteTodolist?: boolean,
}
type MapDispatchToProps = {
    setTodolists: () => void,
    addTodolist: (newTodolist: string) => void
}

class App extends React.Component<MapStateToPropsType & MapDispatchToProps> {


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
            .map(tl => <TodoList
                preloader={tl.preloader}
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tl.tasks}
                disabled={tl.disabled}
                disabledDeleteTodolist={tl.disabledDeleteTodolist}
                todolists={this.props.todolists}
            />)

        return (
            <>
                {
                    this.props.preloader
                        ? <Preloader/>
                        : <>
                            <div>
                                <AddNewItemForm addItem={this.addTodoList}
                                                disabledAddTodo={this.props.disabled}
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

