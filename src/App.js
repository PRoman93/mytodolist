import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm'
import TodoList from "./TodoList";

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
        state.todoList.forEach(t=>{
            if(t.id >= this.nextItemId){
                this.nextItemId = t.id + 1
            }
                })
        this.setState(state)
    }
    addTodoList = (title) => {
        let newTodoList = {
            id:this.nextItemId,
            title
        }
        this.nextItemId++
        // let newTodoLists = [...this.state.todoList, newTodoList]
        // this.setState({
        //     todoList:newTodoLists
        // })
        this.setState({
            todoList: [...this.state.todoList, newTodoList]
        }, ()=>{this.saveState()})
    }

    render = () => {
        let todoLists = this.state.todoList.map(t=> <TodoList id={t.id} title={t.title}/>)

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

export default App;

