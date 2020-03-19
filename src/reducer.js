export const SET_TODOLIST = 'Todolist/Reducer/SET-TODOLIST'
export const ADD_TODOLIST = 'Todolist/Reducer/ADD-TODOLIST'
export const CHANGE_TASK = 'Todolist/Reducer/CHANGE-TASK'
export const ADD_TASK = 'Todolist/Reducer/ADD-TASK'
export const SET_TASKS = 'Todolist/Reducer/SET-TASKS'
export const DELETE_TASK = 'Todolist/Reducer/DELETE-TASK'
export const DELETE_TODOLIST = 'Todolist/Reducer/DELETE-TODOLIST'

const initialState = {
    todoList: [
        // {title:'JS', id:0, tasks:[{id:1, title:'React', isDone:true, priority:'low'}]}
    ]
}
export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TODOLIST:
            return {
                ...state, todoList: action.todoList
            }
        case ADD_TODOLIST:
            return {
                ...state, todoList: [...state.todoList, {...action.newTodoList, tasks: []}]
            }
        case ADD_TASK:
            return {
                ...state, todoList: state.todoList.map(t => {
                    if (t.id === action.todoListId) {
                        return {...t, tasks: [...t.tasks, action.newTask]}
                    } else {
                        return t
                    }
                })
            }
        case SET_TASKS:
            return {
                ...state, todoList: state.todoList.map(t => {
                    if (t.id === action.todoListId) {
                        return {...t, tasks: action.tasks}
                    } else {
                        return t
                    }
                })
            }
        case CHANGE_TASK:
            return {
                ...state, todoList: state.todoList.map(todo => {
                    if (todo.id === action.task.todoListId) {
                        return {
                            ...todo, tasks: todo.tasks.map(t => {
                                if (t.id === action.task.id) {
                                    return action.task
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
        case DELETE_TASK:
            debugger
            return {
                ...state, todoList: state.todoList.map(todo => {
                    if (todo.id === action.todoListId) {
                        return {
                            ...todo, tasks: todo.tasks.filter(t => t.id != action.taskId)
                        }
                    } else {
                        return todo
                    }
                })
            }
        case DELETE_TODOLIST:
            return {
                ...state, todoList: state.todoList.filter(t => t.id != action.todoListId)
            }
    }
    return state;
}
export const addTaskAC = (newTask, todoListId) => {
    return {type: ADD_TASK, newTask, todoListId}
}
export const setTasksAC = (tasks, todoListId) => {
    return {type: SET_TASKS, tasks, todoListId}
}
export const setTodoListAC = (todoList) => {
    return {type: SET_TODOLIST, todoList}
}
export const addTodoListAC = (newTodoList) => {
    return {type: ADD_TODOLIST, newTodoList}
}
export const changeTaskAC = (task) => {
    return {type: CHANGE_TASK, task}
}
export const deleteTaskAC = (taskId, todoListId) => {
    debugger
    return {type: DELETE_TASK, taskId, todoListId}
}
export const deleteTodoListAC = (todoListId) => {
    return {type: DELETE_TODOLIST, todoListId}
}