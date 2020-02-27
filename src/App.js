import React from 'react';
import './App.css';
import TodoList from "./TodoList";

class App extends React.Component {

    state = {
        todolists: [
            {title: 'What to learn?', id: 1},
            {title: 'Week tasks', id: 2},
            {title: 'Year tasks', id: 3},
            {title: 'Day tasks', id: 4}
        ]
    }

    render = () => {
        debugger

        let todolists = this.state.todolists.map(t => <TodoList title={t.title} id={t.id}/>)
        return (
            <div className="App">
                {todolists}
            </div>
        );
    }
}

export default App;

