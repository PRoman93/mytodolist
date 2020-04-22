export type TodoListType = {
    id: string,
    addedDate: string,
    order: number,
    title: string,
    tasks: Array<TaskType>,
    preloader:boolean,
    disabled:boolean,
    disabledDeleteTodolist?:boolean
}
export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
    preloader?:boolean,
    disabled?:boolean[],
    disabledDeleteTask?:boolean
}
export type InitialStateType = {
    todolists:TodoListType[]
    preloader:boolean,
    disabled: boolean,
    disabledDeleteTask: boolean
}
export type CreateTodoResponseType = {
    data:{
        item:TodoListType
    },
    messages?:Array<string>,
    resultCode:number
}

