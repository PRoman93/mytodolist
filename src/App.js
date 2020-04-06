import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodo, getTodo} from "./reducer";
import Preloader from "./Preloader";

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
        // const disabledTodo = this.props.todolists.map(t=> t.disabled)
        const todolists = this.props
            .todolists
            .map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks} todolists={tl}/>)

        return (
            <>
                {
                    this.props.preloader
                        ? <Preloader/>
                        : <>
                            <div>
                                <AddNewItemForm addItem={this.addTodoList}
                                                // todolists={disabledTodo}
                                                disabled={this.props.disabled}/>
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
        todolists: state.todolists,
        preloader: state.preloader,
        disabled:state.disabled
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

