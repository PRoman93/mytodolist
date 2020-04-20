import React, {ChangeEvent} from 'react';
import './App.css';

type PropType = {
    changeHeader:(title:string)=>void,
    onDelete:()=>void,
    title:string,
    disabledDeleteTodolist:boolean
}
type StateType = {
    editMode:boolean,
    title:string
}
class TodoListTitle extends React.Component<PropType, StateType> {

    state = {
        editMode: false,
        title: this.props.title
    }
    onEditTitleMode = () => {
        this.setState({
            editMode: true
        })
    }
    onChangeHeader = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            title: e.currentTarget.value
        })
    }
    changeHeader = () => {
        if (this.state.title === '') {
            this.setState({
                editMode: true
            })
        } else {
            this.props.changeHeader(this.state.title)
            this.setState({editMode: false})
        }

    }
    render = () => {
        console.log(this.props.disabledDeleteTodolist)
        return (
            <>
                {!this.state.editMode &&
                <h3 onDoubleClick={this.onEditTitleMode}
                    className="todoList-header__title">{this.state.title}
                    <button
                        disabled={this.props.disabledDeleteTodolist}
                        onClick={this.props.onDelete}>X</button>
                </h3>}

                {this.state.editMode && <input type="text"
                                               autoFocus={true}
                                               value={this.state.title}
                                               onBlur={this.changeHeader}
                                               onChange={this.onChangeHeader}/>}

            </>
        )
    }
}

export default TodoListTitle;

