import {api} from "./DAL/api";
import {InitialStateType, TaskType, TodoListType} from "./types/entities";
import {
    addTaskSuccessActionType,
    addTodolistSuccessActionType,
    changeHeaderSuccessActionType,
    deleteTaskSuccessActionType,
    deleteTodolistSuccessActionType,
    disabledTaskSuccessActionType,
    disabledTodoSuccessActionType,
    loadingDeleteTodolistSuccessActionType,
    loadingTasksSuccessActionType,
    loadingTodosSuccessActionType,
    setTasksSuccessActionType,
    setTodolistsSuccessActionType,
    updateTaskSuccessActionType
} from "./types/action_creators_types";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {
    ADD_TASK,
    ADD_TODOLIST,
    CHANGE_HEADER,
    DELETE_TASK,
    DELETE_TODOLIST,
    DISABLED_TASK,
    DISABLED_TODOLIST,
    LOADING_DELETE_TODOLIST_SUCCESS,
    LOADING_TASKS,
    LOADING_TODOS,
    SET_TASKS,
    SET_TODOLISTS,
    UPDATE_TASK
} from "./types/constants";

const initialState: InitialStateType = {
    todolists: [],
    preloader: false,
    disabled: false,
    disabledDeleteTodolist: false,
    disabledDeleteTask: false,
}

const todolistReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map((tl: TodoListType) => {
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
                todolists: state.todolists.map((t: TodoListType) => {
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
                todolists: state.todolists.map((t: TodoListType) => {
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
                todolists: state.todolists.map((t: TaskType) => {
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
                todolists: state.todolists.filter((tl: TodoListType) => tl.id !== action.todolistId)
            }
        case LOADING_DELETE_TODOLIST_SUCCESS:
            return {
                ...state, todolists: state.todolists.map((t:TodoListType) => {
                    if (t.id === action.todolistId) {
                        return {
                            ...t,
                            disabledDeleteTodolist: action.disabled
                        }
                    } else {
                        return t
                    }
                })
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map((tl: TodoListType) => {
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
                todolists: state.todolists.map((tl: TodoListType) => {
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
                todolists: state.todolists.map((tl: TodoListType) => {
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
    }
    return state;
}

//Action creators
const updateTaskSuccess = (todolistId: string, taskId: string, obj: any): updateTaskSuccessActionType =>/////////////////
    ({type: UPDATE_TASK, todolistId, taskId, obj})

const deleteTodolistSuccess = (todolistId: string): deleteTodolistSuccessActionType =>
    ({type: DELETE_TODOLIST, todolistId: todolistId})

const deleteTaskSuccess = (taskId: string, todolistId: string): deleteTaskSuccessActionType =>
    ({type: DELETE_TASK, taskId, todolistId})

const addTaskSuccess = (task: TaskType, todolistId: string): addTaskSuccessActionType =>
    ({type: ADD_TASK, task, todolistId})

const setTasksSuccess = (tasks: TaskType[], todolistId: string): setTasksSuccessActionType =>
    ({type: SET_TASKS, tasks, todolistId})

const addTodolistSuccess = (newTodolist: TodoListType): addTodolistSuccessActionType =>
    ({type: ADD_TODOLIST, newTodolist: newTodolist})

const changeHeaderSuccess = (todolistId: string, title: string): changeHeaderSuccessActionType =>
    ({type: CHANGE_HEADER, todolistId, title})

const setTodolistsSuccess = (todolists: Array<TodoListType>): setTodolistsSuccessActionType =>
    ({type: SET_TODOLISTS, todolists: todolists})

const loadingTodosSuccess = (status: boolean): loadingTodosSuccessActionType =>
    ({type: LOADING_TODOS, status})

const disabledTodoSuccess = (disabled: boolean): disabledTaskSuccessActionType =>
    ({type: DISABLED_TODOLIST, disabled})

const disabledTaskSuccess = (disabled: boolean, todolistId: string): disabledTodoSuccessActionType =>
    ({type: DISABLED_TASK, disabled, todolistId})

const loadingTasksSuccess = (status: boolean, todolistId: string): loadingTasksSuccessActionType =>
    ({type: LOADING_TASKS, status, todolistId})


const loadingDeleteTodolistSuccess = (todolistId: string, disabled: boolean): loadingDeleteTodolistSuccessActionType =>
    ({type: LOADING_DELETE_TODOLIST_SUCCESS, todolistId, disabled})

// ACTION TYPES
type TodoActionType =
    updateTaskSuccessActionType
    | deleteTodolistSuccessActionType
    | deleteTaskSuccessActionType
    | addTaskSuccessActionType
    | setTasksSuccessActionType
    | addTodolistSuccessActionType
    | changeHeaderSuccessActionType
    | setTodolistsSuccessActionType
    | loadingTodosSuccessActionType
    | disabledTaskSuccessActionType
    | disabledTodoSuccessActionType
    | loadingTasksSuccessActionType
    | loadingDeleteTodolistSuccessActionType

type AppActionType = TodoActionType


//thunk types
type ThunkType = ThunkAction<void, InitialStateType, unknown, AppActionType>
type ThunkDispatchType = ThunkDispatch<InitialStateType, unknown, AppActionType>
///

export const getTodo = (): ThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(loadingTodosSuccess(true))
    api.getTodolists()
        .then(res => {
            dispatch(setTodolistsSuccess(res.data))
            dispatch(loadingTodosSuccess(false))
        })
}
export const getTasks = (todolistId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(loadingTasksSuccess(true, todolistId))
    api.getTasks(todolistId)
        .then(res => {
            dispatch(loadingTasksSuccess(false, todolistId))
            dispatch(setTasksSuccess(res.data.items, todolistId))
        })
}
export const addTodo = (newTodo: string): ThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(disabledTodoSuccess(true))
    api.createTodolist(newTodo)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistSuccess(res.data.data.item))
                dispatch(disabledTodoSuccess(false))
            }
        })
}
export const addTask = (task: string, todolistId: string) => (dispatch: ThunkDispatchType) => {

    dispatch(disabledTaskSuccess(true, todolistId))
    api.createTask(task, todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskSuccess(res.data.data.item, todolistId))
                dispatch(disabledTaskSuccess(false, todolistId))
            }
        })
}
export const deleteTask = (taskId: string, todolistId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.deleteTask(taskId, todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskSuccess(taskId, todolistId))
            }
        })
}
export const deleteTodo = (todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(loadingDeleteTodolistSuccess(todolistId, true))
    api.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(loadingDeleteTodolistSuccess(todolistId, false))
                dispatch(deleteTodolistSuccess(todolistId))
            }
        })
}
export const changeTitle = (todolistId: string, title: string) => (dispatch: ThunkDispatchType) => {
    api.changeHeader(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeHeaderSuccess(todolistId, title))
            }
        })
}
export const updateTask = (todolistId: string, taskId: string, obj: any, task: TaskType) => (dispatch: ThunkDispatchType) => {///////////////
    api.changeTask(todolistId, taskId, task)
        .then(res => {
            dispatch(updateTaskSuccess(todolistId, taskId, obj))
        })
}

export default todolistReducer;
