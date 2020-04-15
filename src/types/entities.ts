export type TodoListType = {
    id: string,
    addedDate: string,
    order: number,
    title: string,
    tasks: Array<TaskType>,
    preloader:Array<boolean>,
    disabled:boolean
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
    addedDate: string
}
export type InitialStateType = {
    todolists:any,
    preloader:boolean,
    disabled: boolean,
    disabledDeleteTodolist: boolean,
    disabledDeleteTask: boolean
}
export type CreateTodoResponseType = {
    data:{
        item:TodoListType
    },
    messages?:Array<string>,
    resultCode:number
}

