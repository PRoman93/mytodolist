import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm'
import TodoList from "./TodoList";
import {connect} from "react-redux";

class App extends React.Component {

    state = {
        todoList: []
    };
    nextItemId = 1

    componentDidMount() {
        this.restoreState()
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem('todoList', stateAsString)
    }
    restoreState = () => {
        let state = {
            todoList: []
        }
        let stateAsString = localStorage.getItem('todoList')
        if (stateAsString != null) {
            state = JSON.parse(stateAsString)
        }
        state.todoList.forEach(t => {
            if (t.id >= this.nextItemId) {
                this.nextItemId = t.id + 1
            }
        })
        this.setState(state)
    }
    addTodoList = (title) => {
        let newTodoList = {id: this.nextItemId, title, tasks:[]}
        this.nextItemId++
        this.props.addTodoList(newTodoList)
    }

    render = () => {
        let todoLists = this.props.todoList.map(t => <TodoList id={t.id} title={t.title} tasks={t.tasks}/>)

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoList: state.todoList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: (newTodoList, id) => {
            const action = {
                type: 'ADD-TODOLIST',
                newTodoList,
                id
            }
            dispatch(action)
        },

    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp;

