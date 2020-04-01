import {api} from "./DAL/api";

export const ADD_TODOLIST = "TodoList/Reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const SET_TASKS = "TodoList/Reducer/SET-TASKS";
export const UPDATE_TASK = "TodoList/Reducer/UPDATE-TASK";
export const SET_TODOLISTS = "TodoList/Reducer/SET-TODOLISTS";
export const CHANGE_HEADER = "TodoList/Reducer/CHANGE-HEADER";

const initialState = {
    "todolists": [
        // {
        //     "id": 0, "title": "every day",
        //     tasks: [
        //         {"title": "css11", "isDone": false, "priority": "low", "id": 0},
        //         {"title": "js", "isDone": false, "priority": "low", "id": 1},
        //         {"title": "react", "isDone": false, "priority": "low", "id": 2},
        //         {"title": "sasasa", "isDone": false, "priority": "low", "id": 3},
        //         {"title": "yoaa", "isDone": false, "priority": "low", "id": 4},
        //         {"title": "sddsdsds", "isDone": false, "priority": "low", "id": 5}]
        // },
        // {"id": 1, "title": "tomorrow", tasks: []},
        // {"id": 2, "title": "weewwe`", tasks: []},
        // {"id": 3, "title": "dddd", tasks: []}
    ]
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
                    if (tl.id === action.task.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.task.taskId) {
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
    }
    return state;
}

export const updateTaskSuccess = (taskId, task, todolistId) => {
    debugger
    return {type: UPDATE_TASK, taskId, task, todolistId};
}
export const deleteTodolistSuccess = (todolistId) => {
    return {type: DELETE_TODOLIST, todolistId: todolistId};
}
export const deleteTaskSuccess = (taskId, todolistId) => {
    return {type: DELETE_TASK, taskId, todolistId};
}
export const addTaskSuccess = (task) => {
    return {type: ADD_TASK, task};
}
const setTasksSuccess = (tasks, todolistId) => {
    return {type: SET_TASKS, tasks, todolistId};
}
export const addTodolistSuccess = (newTodolist) => {
    return {type: ADD_TODOLIST, newTodolist: newTodolist}
}
export const changeHeaderSuccess = (todolistId, title) => {
    return {type: CHANGE_HEADER, todolistId, title}
}
const setTodolistsSuccess = (todolists) => {
    return {type: SET_TODOLISTS, todolists: todolists}
}


export const getTodo = () => (dispatch) => {
    api.getTodolists()
        .then(res => {
            dispatch(setTodolistsSuccess(res.data))
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
export const updateTask = (taskId, task, todolistId) => (dispatch) => {
    debugger
    api.changeTask(taskId, task, todolistId)
        .then(res => {
            debugger
            if (res.data.resultCode === 0) {
            dispatch(updateTaskSuccess(taskId, task, todolistId))
            }
        })
}
export default reducer;
