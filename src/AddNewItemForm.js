import React, {Component} from "react";

class AddNewItemForm extends Component {

    state = {
        error: false,
        title:''
    }
    onAddItemClick = () => {
        let newText = this.state.title
        this.state.title = ''
        if (newText === '') {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false
            })
            this.props.addItem(newText)
        }
    }
    onKeyPress = (e) => {
        if(e.key === 'Enter')
        this.onAddItemClick()
    }
    onTitleChange = (e) => {
        let newValue = e.currentTarget.value
        this.setState({
            title:newValue,
            error:false
        })
    }

    render() {
        let error = this.state.error ? 'error' : ''
        return (
                <div className="todoList-newItemForm">
                    <input className={error}
                           value={this.state.title}
                           onKeyPress={this.onKeyPress}
                           onChange={this.onTitleChange}
                           type="text"
                           placeholder="New item name"/>
                    <button onClick={this.onAddItemClick}>Add</button>
                </div>
        )
    }
}

export default AddNewItemForm
