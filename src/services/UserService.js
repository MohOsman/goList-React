import axios from 'axios';

const API_URL = 'http://localhost:8080';



export const register = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/register`, user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const login = async (user)  => {
    try {
       return  await axios.post(`${API_URL}/login`, user)  

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};




