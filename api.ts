import axios from "axios";
import { CreateUser } from "./interfaces";

const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'aplication/json'
    }
});

export async function postUser (userData: CreateUser) {
    const response = await api.post("/user", userData); 
    return response.data; 
}
