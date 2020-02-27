import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader'
import TodoListTasks from './TodoListTasks'
import TodoListFooter from './TodoListFooter'

class TodoList extends React.Component {

    state = {
        tasks: [
            // {id: 1, title: 'JS', isDone: false, priority: 'medium'},
            // {id: 2, title: 'HTML', isDone: true, priority: 'low'},
            // {id: 3, title: 'CSS', isDone: true, priority: 'low'},
            // {id: 4, title: 'React', isDone: false, priority: 'high'}
        ],
        filterValue: 'All'
    };
    nextTaskId = 1

    componentDidMount() {
        this.restoreState()
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem('state-'+ this.props.id, stateAsString)
    }
    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        }
        let stateAsString = localStorage.getItem('state-'+ this.props.id)
        if (stateAsString != null) {
            state = JSON.parse(stateAsString)
        }
        state.tasks.forEach(t=>{
            if(t.id >= this.nextTaskId){
                this.nextTaskId = t.id + 1
            }
                })
        this.setState(state)
    }

    addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: 'low'
        }
        this.nextTaskId++
        let newTasks = [...this.state.tasks, newTask]
        this.setState({
            tasks: newTasks
        }, () => {
            this.saveState()
        })
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState()
        })
    }
    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t
            } else {
                return {...t, ...obj}
            }
        })
        this.setState({
            tasks: newTasks
        }, () => {
            this.saveState()
        })
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    }

    render = () => {
        return (
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>

                    <TodoListTasks changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   tasks={this.state.tasks.filter(t => {
                                       switch (this.state.filterValue) {
                                           case "All":
                                               return t;
                                           case "Completed":
                                               return t.isDone;
                                           case "Active":
                                               return !t.isDone
                                       }
                                       // if(this.state.filterValue === 'All'){
                                       //     return t
                                       // }
                                       // if(this.state.filterValue === 'Completed'){
                                       //     return t.isDone
                                       // }
                                       // if(this.state.filterValue === 'Active'){
                                       //     return !t.isDone
                                       // }
                                   })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
        );
    }
}

export default TodoList;

