import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODOLIST, addTodolistAC, getTodo, setTodolistsAC, setTodolistsSuccess} from "./reducer";
import axios from "axios";
import {api} from "./DAL/api";

class App extends React.Component {

    state = {
        todolists: []
    }

    addTodoList = (title) => {
        api.createTodolist(title)
            .then(res => {
                let todolist = res.data.data.item
                this.props.addTodolist(todolist)
            })
    }

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        api.getTodolists()
            .then(res => {
                this.props.setTodolists(res.data)
            })
    }

    render = () => {
        const todolists = this.props
            .todolists
            .map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>)

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTodolists: () => {
            const thunk = getTodo();
            dispatch(thunk)
        },
        addTodolist: (newTodolist) => {
            const action = addTodolistAC(newTodolist);
            dispatch(action)
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

