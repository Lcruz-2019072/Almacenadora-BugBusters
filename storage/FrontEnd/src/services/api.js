import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/tarea',
    timeout: 5000
})

export const addTaskRequest = async (tarea) => {
    try {
        return await apiClient.post('/createTarea', tarea)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getTaskRequest = async () => {
    try {
        const response = await apiClient.get('/listTareas')
        return response.data.tareas
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}



export const updateTaskRequest = async (taskId, updatedTask) => {
    try {
        return await apiClient.put(`/editTarea/${taskId}`, updatedTask)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const deleteTaskRequest = async (taskId) => {
    try {
        return await apiClient.delete(`/deleteTarea/${taskId}`)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}


