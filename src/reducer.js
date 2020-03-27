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
    }
    console.log("reducer: ", action);
    return state;
}

export const updateTaskAC = (taskId, obj, todolistId) => {return {type: UPDATE_TASK, taskId, obj, todolistId};}
export const deleteTodolistAC = (todolistId) => {return {type: DELETE_TODOLIST, todolistId: todolistId};}
export const deleteTaskAC = (taskId, todolistId) => {return {type: DELETE_TASK, taskId, todolistId};}
export const addTaskAC = (task) => {return {type: ADD_TASK, task};}
export const setTasksSuccess = (tasks, todolistId) => {return {type: SET_TASKS, tasks, todolistId};}
export const addTodolistAC = (newTodolist) => {return {type: ADD_TODOLIST, newTodolist: newTodolist}}
export const changeHeaderAC = (todolistId, title) => {return {type: CHANGE_HEADER, todolistId, title}}
const setTodolistsSuccess = (todolists) => {return {type: SET_TODOLISTS, todolists: todolists}}


// const thunkCreator = () => {
//     return (dispatch, getState) => {
//         api.getTasks()
//             .then(res => {
//                 dispatch(actionCreator())
//             })
//     }
// };


export const getTodo = () => (dispatch) => {
    api.getTodolists()
        .then(res => {
            dispatch(setTodolistsSuccess(res.data))
        })
}
export const getTasks = (todolistId) => (dispatch) => {
    debugger
    api.getTasks(todolistId)
        .then(res => {
            debugger
            dispatch(setTasksSuccess(res.data.items, todolistId))
        })
}


export default reducer;
