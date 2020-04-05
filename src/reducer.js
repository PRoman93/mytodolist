import {api} from "./DAL/api";

export const ADD_TODOLIST = "TodoList/Reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const SET_TASKS = "TodoList/Reducer/SET-TASKS";
export const UPDATE_TASK = "TodoList/Reducer/UPDATE-TASK";
export const SET_TODOLISTS = "TodoList/Reducer/SET-TODOLISTS";
export const CHANGE_HEADER = "TodoList/Reducer/CHANGE-HEADER";
export const CHANGE_PRELOADER = "TodoList/Reducer/CHANGE-PRELOADER";

const initialState = {
    todolists: [],
    preloader: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl;
                    } else {
                        return {...tl, tasks: action.tasks}
                    }
                })
            }
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            }
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case CHANGE_HEADER:
            // debugger
            return {
                ...state,
                todolists: state.todolists.map(t => {
                    if (t.id === action.todolistId) {
                        return {
                            ...t, title: action.title
                        }
                    } else {
                        return t
                    }
                })
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id !== action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            }
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.task.todoListId) {
                        return {...tl, tasks: [...tl.tasks, action.task]}
                    } else {
                        return tl
                    }
                })
            }
        case UPDATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.taskId) {
                                    return t;
                                } else {
                                    debugger
                                    return {...t, ...action.obj};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
        case CHANGE_PRELOADER:
            return {
                ...state, preloader: action.status
            }
    }
    return state;
}

const updateTaskSuccess = (todolistId, taskId, obj) => {
    return {type: UPDATE_TASK, todolistId, taskId, obj};
}
const deleteTodolistSuccess = (todolistId) => {
    return {type: DELETE_TODOLIST, todolistId: todolistId};
}
const deleteTaskSuccess = (taskId, todolistId) => {
    return {type: DELETE_TASK, taskId, todolistId};
}
const addTaskSuccess = (task) => {
    return {type: ADD_TASK, task};
}
const setTasksSuccess = (tasks, todolistId) => {
    return {type: SET_TASKS, tasks, todolistId};
}
const addTodolistSuccess = (newTodolist) => {
    return {type: ADD_TODOLIST, newTodolist: newTodolist}
}
const changeHeaderSuccess = (todolistId, title) => {
    return {type: CHANGE_HEADER, todolistId, title}
}
const setTodolistsSuccess = (todolists) => {
    return {type: SET_TODOLISTS, todolists: todolists}
}
const changePreloader = (status) => ({type: CHANGE_PRELOADER, status})


export const getTodo = () => (dispatch) => {
    dispatch(changePreloader(true))
    api.getTodolists()
        .then(res => {
            dispatch(setTodolistsSuccess(res.data))
            dispatch(changePreloader(false))
        })
}
export const getTasks = (todolistId) => (dispatch) => {
    api.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksSuccess(res.data.items, todolistId))
        })
}
export const addTodo = (newTodo) => (dispatch) => {
    api.createTodolist(newTodo)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistSuccess(res.data.data.item))
            }
        })
}
export const addTask = (task, todolistId) => (dispatch) => {
    api.createTask(task, todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskSuccess(res.data.data.item, todolistId))
            }
        })
}
export const deleteTask = (taskId, todolistId) => (dispatch) => {
    api.deleteTask(taskId, todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskSuccess(taskId, todolistId))
            }
        })
}
export const deleteTodo = (todolistId) => (dispatch) => {
    api.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTodolistSuccess(todolistId))
            }
        })
}
export const changeTitle = (todolistId, title) => (dispatch) => {
    api.changeHeader(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeHeaderSuccess(todolistId, title))
            }
        })
}
export const updateTask = (todolistId, taskId, obj, task) => (dispatch) => {
    dispatch(changePreloader(true))
    api.changeTask(todolistId, taskId, task)
        .then(res => {
            debugger
            dispatch(updateTaskSuccess(todolistId, taskId, obj))
            dispatch(changePreloader(false))
        })
}

export default reducer;
