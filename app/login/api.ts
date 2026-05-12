import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
})

export interface Login {
    email: string;
    password: string;
}

export const postLogin = async (login: Login) =>  {
    try{
        const response = await axios.post('/login', login);
        return response.data;
    }
    catch(error){
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}