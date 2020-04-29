import {TaskType, TodoListType} from "./entities";
import {
    ADD_TASK,
    ADD_TODOLIST,
    CHANGE_HEADER,
    DELETE_TASK,
    DELETE_TODOLIST,
    DISABLED_TASK,
    DISABLED_TODOLIST,
    LOADING_DELETE_TASK_SUCCESS,
    LOADING_DELETE_TODOLIST_SUCCESS,
    LOADING_TASKS,
    LOADING_TODOS,
    SET_TASKS,
    SET_TODOLISTS,
    UPDATE_TASK
} from './constants';
export type updateTaskSuccessActionType = {
    type: typeof UPDATE_TASK,
    todolistId: string,
    taskId: string,
    obj: any
}
export type deleteTodolistSuccessActionType = {
    type: typeof DELETE_TODOLIST,
    todolistId: string,
}
export type deleteTaskSuccessActionType = {
    type: typeof DELETE_TASK,
    taskId: string,
    todolistId: string,
}
export type addTaskSuccessActionType = {
    type: typeof ADD_TASK,
    task: TaskType,
    todolistId:string
}
export type setTasksSuccessActionType = {
    type: typeof SET_TASKS,
    tasks: TaskType[],
    todolistId:string
}
export type addTodolistSuccessActionType = {
    type: typeof ADD_TODOLIST,
    newTodolist:TodoListType
}
export type changeHeaderSuccessActionType = {
    type: typeof CHANGE_HEADER,
    todolistId:string,
    title:string
}
export type setTodolistsSuccessActionType = {
    type: typeof SET_TODOLISTS,
    todolists:Array<TodoListType>,
}
export type loadingTodosSuccessActionType = {
    type: typeof LOADING_TODOS,
    status:boolean,
}
export type disabledTaskSuccessActionType = {
    type: typeof DISABLED_TODOLIST,
    disabled:boolean,
}
export type disabledTodoSuccessActionType = {
    type: typeof DISABLED_TASK,
    disabled:boolean,
    todolistId:string
}
export type loadingTasksSuccessActionType = {
    type: typeof LOADING_TASKS,
    status:boolean,
    todolistId:string
}
export type loadingDeleteTodolistSuccessActionType = {
    type: typeof LOADING_DELETE_TODOLIST_SUCCESS,
    todolistId:string,
    disabled:boolean
}
export type loadingDeleteTaskSuccessActionType = {
    type: typeof LOADING_DELETE_TASK_SUCCESS,
    todolistId:string,
    taskId:string,
    disabled:boolean
}
