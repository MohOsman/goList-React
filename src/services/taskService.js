import axios from 'axios';


const API_URL = 'http://localhost:8080';


export const fetchTasks = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
        const response = await axios.get(`${API_URL}/tasks`,  {
            headers: {
                'Authorization': `Bearer ${token}` // Include the JWT token in the request headers
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const addTask = async (task) => {
    const token = localStorage.getItem('jwtToken');
    try {
    const response = await axios.post(`${API_URL}/tasks`, task, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the JWT token in the request headers
      }
    });
    return response.data
    } catch (error) {
        console.error('Error adding task:', error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

export const updateTaskCompletion = async (id, isDone) => {
    try {
        await axios.put(`${API_URL}/tasks/${id}`, { isDone });
    } catch (error) {
        console.error('Error updating task completion:', error);
        throw error;
    }
};
