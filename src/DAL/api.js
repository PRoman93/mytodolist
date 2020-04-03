import axios from 'axios'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "cde98104-6e07-4290-87b8-6584c1b2a239"}

});

export const api = {
    createTask(newText, todolistId) {
        return instance.post(`/${todolistId}/tasks`, {title: newText})
    },
    createTodolist(title) {
        return instance.post('', {title: title})
    },
    changeHeader(todolistId, title) {
        return instance.put(`/${todolistId}`, {title: title})
    },
    getTodolists() {
        return instance.get(``)
    },
    changeTask(todolistId, taskId, task) {
        debugger
        return instance.put(`${todolistId}/tasks/${taskId}`, task)
    },
    deleteTodolist(id) {
        return instance.delete(`/` + id)
    },
    deleteTask(taskId, todolistId) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
    },
    getTasks(todolistId) {
        return instance.get(`/${todolistId}/tasks`)
    }
}
