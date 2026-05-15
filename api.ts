import axios from "axios";
import { CreateUser, Login } from "./interfaces";

const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function postUser (userData: CreateUser) {
    const response = await api.post("/user", userData); 
    return response.data; 
}

export async function postLogin (login: Login) {
    const response = await axios.post('/login', login);
    return response.data;
}
