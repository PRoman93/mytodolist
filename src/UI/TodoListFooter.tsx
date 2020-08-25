import React from 'react';
import './App.css';
import {Button} from "@material-ui/core";

type PropType = {
    changeFilter: (filter: string) => void,
    filterValue: string
}
type StateType = {
    isHidden: boolean
}

class TodoListFooter extends React.Component<PropType, StateType> {

    state = {
        isHidden: false
    }

    onAllFilterClick = () => {
        this.props.changeFilter("All");
    }
    onCompletedFilterClick = () => {
        this.props.changeFilter("Completed");
    }
    onActiveFilterClick = () => {
        this.props.changeFilter("Active");
    }
    onShowFiltersClick = () => {
        this.setState({isHidden: true})
    }
    onHideFiltersClick = () => {
        this.setState({isHidden: false})
    }

    render = () => {

        let classForAll = this.props.filterValue === "All" ? "outlined" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "outlined" : "";
        let classForActive = this.props.filterValue === "Active" ? "outlined" : "";

        return (
            <div className="todoList-footer">
                {!this.state.isHidden && <div>
                    <Button color='secondary' onClick={this.onAllFilterClick} variant={classForAll as any}>All</Button>
                    <Button color='secondary' onClick={this.onCompletedFilterClick} variant={classForCompleted as any}>Completed</Button>
                    <Button color='secondary' onClick={this.onActiveFilterClick} variant={classForActive as any}>Active</Button>
                </div>
                }
                {!this.state.isHidden && <span onClick={this.onShowFiltersClick}>hide</span>}
                {this.state.isHidden && <span onClick={this.onHideFiltersClick}>show</span>}
            </div>
        );
    }
}

export default TodoListFooter;

