import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";


class App extends React.Component {

    state = {
        todoLists: []
    };
    nextItemId = 1

  componentDidMount() {
        this.restoreState()
  }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem('todolist', stateAsString)
    }

    restoreState = () => {
        debugger
        let state = {
            todoLists: []
        }
        let stateAsString = localStorage.getItem('todolist')
        if(stateAsString !== null) {
            state = JSON.parse(stateAsString)
        }
        this.state.todoLists.forEach(t=> {
            if(t.id >= this.nextItemId){
                this.nextItemId = t.id +1
            }
        })
        this.setState(state)
    }

    addTodoList = (title) => {
        let newList = {
            id: this.nextItemId,
            title
        }
        this.nextItemId++
        let newLists = [...this.state.todoLists, newList]
        this.setState({
            todoLists: newLists
        }, () => {this.saveState()})
    }


    render = () => {

        let todolists = this.state.todoLists.map(t => <TodoList id={t.id} title={t.title}/>)
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

export default App;

