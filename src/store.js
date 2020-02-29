import {createStore} from "redux";

const initialState = {
    todoList: [
        {id: 1, title: "Day tasks", tasks: [{id: 1, title: "фы", isDone: false, priority: "low"}]},
        {id: 2, title: "Month tasks", tasks: [{id: 1, title: "фa", isDone: false, priority: "low"}]}
    ]
}

const reducer = (state = initialState, action) => {
    console.log('reducer: ', action);
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
            debugger
            return {
                ...state, todoList: state.todoList.map(t => {
                    if (t.id === action.todoListId) {
                        return {
                            ...t, tasks: state.todoList.tasks.map(t => {
                                if (t.id === action.taskId) {
                                    return {...t, ...action.obj}
                                } else {
                                    return t
                                }
                            })
                        }
                    } else {
                        return t
                    }
                })
            }

    }

    return state;
}

const store = createStore(reducer);
export default store;