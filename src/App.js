import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodo, getTodo} from "./reducer";
import Preloader from "./Preloader";
import TodoListTitle from "./TodoListTitle";

class App extends React.Component {

    state = {
        todolists: []
    }

    addTodoList = (newTodolist) => {
        this.props.addTodolist(newTodolist)
    }

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.setTodolists(this.props.id)
    }

    render = () => {
        const todolists = this.props
            .todolists
            .map(tl => <TodoList disabledDeleteTodolist={this.props.disabledDeleteTodolist}
                                 disabledDeleteTask={this.props.disabledDeleteTask}
                                 requestStatus={this.props.requestStatus}
                                 key={tl.id}
                                 id={tl.id}
                                 title={tl.title}
                                 tasks={tl.tasks}
                                 todolists={tl}/>)

        // const disabledDeleteTodo = <TodoList disabled={this.props.disabled}/>
        return (
            <>
                {
                    this.props.preloader
                        ? <Preloader/>
                        : <>
                            <div>
                                <AddNewItemForm addItem={this.addTodoList}
                                                requestStatus={this.props.requestStatus}
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

const mapStateToProps = (state) => {
    return {
        todolists: state.todolist.todolists,
        preloader: state.preloader,
        disabled: state.disabled,
        requestStatus: state.requestStatus,
        disabledDeleteTodolist: state.disabledDeleteTodolist,
        disabledDeleteTask: state.disabledDeleteTask
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTodolists: () => {
            const thunk = getTodo();
            dispatch(thunk)
        },
        addTodolist: (newTodolist) => {
            const thunk = addTodo(newTodolist);
            dispatch(thunk)
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

