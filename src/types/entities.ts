export type TodoListType = {
    id: string,
    addedDate: string,
    order: number,
    title: string,
    tasks: Array<TaskType>
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
    todolists: Array<TodoListType>,
    preloader: boolean,
    disabled: boolean,
    disabledDeleteTodolist: boolean,
    disabledDeleteTask: boolean
}
