import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm'
import TodoList from "./TodoList";
import {connect} from "react-redux";
import {addTodoListAC, setTodoListAC} from "./reducer";
import axios from "axios";

class App extends React.Component {

    componentDidMount() {
        this._restoreState()
    }



    addTodoList = (title) => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: title}, {
            withCredentials: true,
            headers: {'API-KEY': 'cde98104-6e07-4290-87b8-6584c1b2a239'}
        })
            .then(res => {
                let todoList = res.data.data.item
                this.props.addTodoList(todoList)
            });
    }


    _restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
            .then(res => {
                // console.log(res.data);
                this.props.setTodoLists(res.data)
            });
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
        },
        setTodoLists: (todoList) => {
            const action = setTodoListAC(todoList)
            dispatch(action)
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp;

