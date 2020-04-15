import axios from 'axios'
import {CreateTodoResponseType, TaskType, TodoListType} from "../types/entities";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "cde98104-6e07-4290-87b8-6584c1b2a239"}

});

export const api = {
    createTask(newText:string, todolistId:string) {
        return instance.post(`/${todolistId}/tasks`, {title: newText})
    },
    createTodolist(title:string) {
        return instance.post<CreateTodoResponseType>('', {title: title})
    },
    changeHeader(todolistId:string, title:string) {
        return instance.put(`/${todolistId}`, {title: title})
    },
    getTodolists() {
        return instance.get<TodoListType[]>(``)
    },
    changeTask(todolistId:string, taskId:string, task:TaskType) {
        return instance.put(`${todolistId}/tasks/${taskId}`, task)
    },
    deleteTodolist(id:string) {
        return instance.delete(`/` + id)
    },
    deleteTask(taskId:string, todolistId:string) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
    },
    getTasks(todolistId:string) {
        return instance.get(`/${todolistId}/tasks`)
    }
}
