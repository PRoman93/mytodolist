import {createStore} from "redux";

const initialState = {
    todoList: [
        {title:'JS', id:0, tasks:[{id:1, title:'React', isDone:true, priority:'low'}]}
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return {
                ...state, todoList: [...state.todoList, action.newTodoList]
            }
        case 'ADD-TASK':
            return {
                ...state, todoList: state.todoList.map(t => {
                    if (t.id === action.todoListId) {
                        return {...t, tasks: [...t.tasks, action.newTask]}
                    } else {
                        return t
                    }
                })
            }
        case 'CHANGE-TASK':
            return {
                ...state, todoList: state.todoList.map(todo => {
                    if (todo.id === action.todoListId) {
                        return {
                            ...todo, tasks: todo.tasks.map(t => {
                                if (t.id === action.taskId) {
                                    return {...t, ...action.obj}
                                } else {
                                    return t
                                }
                            })
                        }
                    } else {
                        return todo
                    }
                })
            }
        case 'DELETE-TASK':
            debugger
            return {
                ...state, todoList: state.todoList.map(todo => {
                    if (todo.id === action.todoListId) {
                        return {
                            ...todo, tasks: todo.tasks.filter(t => t.id != action.taskId)
                        }
                    }else {
                        return todo
                    }
                })
            }

        case 'DELETE-TODOLIST':
            return {
                ...state, todoList: state.todoList.filter(t => t.id != action.todoListId)
                // todolists: state.todolists.filter(tl => tl.id != action.todolistId)
            }
    }
    return state;
}

const store = createStore(reducer);
export default store;