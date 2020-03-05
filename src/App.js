import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm'
import TodoList from "./TodoList";
import {connect} from "react-redux";
import {addTodoListAC} from "./reducer";

class App extends React.Component {

    state = {
        todoList: []
    };
    nextItemId = 1


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
        addTodoList: (newTodoList) => {
            dispatch(addTodoListAC(newTodoList))
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp;

