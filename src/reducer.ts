import {api} from "./DAL/api";

export const ADD_TODOLIST = "TodoList/Reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const SET_TASKS = "TodoList/Reducer/SET-TASKS";
export const UPDATE_TASK = "TodoList/Reducer/UPDATE-TASK";
export const SET_TODOLISTS = "TodoList/Reducer/SET-TODOLISTS";
export const CHANGE_HEADER = "TodoList/Reducer/CHANGE-HEADER";
export const LOADING_TODOS = "TodoList/Reducer/LOADING-TODOS";
export const LOADING_TASKS = "TodoList/Reducer/LOADING-TASKS";
export const DISABLED_TODOLIST = "TodoList/Reducer/DISABLED-TODOLIST";
export const DISABLED_TASK = "TodoList/Reducer/DISABLED-TASK";
// export const SET_STATUS = "TodoList/Reducer/SET_STATUS";
export const LOADING_DELETE_TODOLIST_SUCCESS = "TodoList/Reducer/LOADING-DELETE-TODOLIST-SUCCESS";

// export const STATUSES = {
//     SUCCESS: 'SUCCESS',
//     ERROR: 'ERROR',
//     PENDING: 'PENDING',
//     NOT_INIT: 'NOT_INIT'
// }

const initialState = {
    todolists: [],
    preloader: false,
    disabled: false,
    disabledDeleteTodolist: false,
    disabledDeleteTask: false,
    // requestStatus: STATUSES.NOT_INIT
}

const rootReducer = (state = initialState, action) => {
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
                todolists: action.todolists.map(tl => ({
                    ...tl,
                    tasks: [],
                    preloader: false,
                    disabled: false
                }))
            }
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case DISABLED_TODOLIST:
            return {
                ...state,
                disabled: action.disabled
            }
        case CHANGE_HEADER:
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
        case DISABLED_TASK:
            return {
                ...state,
                todolists: state.todolists.map(t => {
                    if (t.id === action.todolistId) {
                        return {
                            ...t, disabled: action.disabled
                        }
                    } else {
                        return t
                    }
                })
            }
        case LOADING_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(t => {
                    if (t.id === action.todolistId) {
                        return {
                            ...t, preloader: action.status
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
                                    return {...t, ...action.obj};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
        case LOADING_TODOS:
            return {
                ...state, preloader: action.status
            }
        case LOADING_DELETE_TODOLIST_SUCCESS:
            return {
                ...state, todolists: state.todolists.map(t => {
                    if (t.id === action.todolistId) {
                        return {
                            ...state,
                            disabledDeleteTodolist: action.disabled
                        }
                    } else {
                        return t
                    }
                })
            }
        // case SET_STATUS:
        //     return {
        //         ...state, requestStatus: action.status
        //     }
    }
    return state;
}
// const setStatus = (status) => {
//     return {type: SET_STATUS, status};
// }
const updateTaskSuccess = (todolistId, taskId, obj) => ({type: UPDATE_TASK, todolistId, taskId, obj})

const deleteTodolistSuccess = (todolistId) => ({type: DELETE_TODOLIST, todolistId: todolistId})

const deleteTaskSuccess = (taskId, todolistId) => ({type: DELETE_TASK, taskId, todolistId})

const addTaskSuccess = (task) => ({type: ADD_TASK, task})

const setTasksSuccess = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId})

const addTodolistSuccess = (newTodolist) => ({type: ADD_TODOLIST, newTodolist: newTodolist})

const changeHeaderSuccess = (todolistId, title) => ({type: CHANGE_HEADER, todolistId, title})

const setTodolistsSuccess = (todolists) => ({type: SET_TODOLISTS, todolists: todolists})

const loadingTodosSuccess = (status) => ({type: LOADING_TODOS, status})

const disabledTodoSuccess = (disabled) => ({type: DISABLED_TODOLIST, disabled})

const disabledTaskSuccess = (disabled, todolistId) => ({type: DISABLED_TASK, disabled, todolistId})

const loadingTasksSuccess = (status, todolistId) => ({type: LOADING_TASKS, status, todolistId})

const loadingDeleteTodolistSuccess = (todolistId, disabled) => ({
    type: LOADING_DELETE_TODOLIST_SUCCESS,
    todolistId,
    disabled
})


export const getTodo = () => (dispatch) => {
    dispatch(loadingTodosSuccess(true))
    api.getTodolists()
        .then(res => {
            dispatch(setTodolistsSuccess(res.data))
            dispatch(loadingTodosSuccess(false))
        })
}
export const getTasks = (todolistId) => (dispatch) => {
    dispatch(loadingTasksSuccess(true, todolistId))
    api.getTasks(todolistId)
        .then(res => {
            dispatch(loadingTasksSuccess(false, todolistId))
            dispatch(setTasksSuccess(res.data.items, todolistId))
        })
}
export const addTodo = (newTodo) => (dispatch) => {
    // dispatch(setStatus(STATUSES.PENDING))
    dispatch(disabledTodoSuccess(true))
    api.createTodolist(newTodo)
        .then(res => {
            // dispatch(setStatus(STATUSES.SUCCESS))
            if (res.data.resultCode === 0) {
                dispatch(addTodolistSuccess(res.data.data.item))
                dispatch(disabledTodoSuccess(false))
            }
        })
}
export const addTask = (task, todolistId) => (dispatch) => {
    // dispatch(setStatus(STATUSES.PENDING))
    dispatch(disabledTaskSuccess(true, todolistId))
    api.createTask(task, todolistId)
        .then(res => {
            // dispatch(setStatus(STATUSES.SUCCESS))
            if (res.data.resultCode === 0) {
                dispatch(addTaskSuccess(res.data.data.item, todolistId))
                dispatch(disabledTaskSuccess(false, todolistId))
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
    dispatch(loadingDeleteTodolistSuccess(todolistId, true))
    api.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(loadingDeleteTodolistSuccess(todolistId, false))
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
    api.changeTask(todolistId, taskId, task)
        .then(res => {
            dispatch(updateTaskSuccess(todolistId, taskId, obj))
        })
}

export default rootReducer;
