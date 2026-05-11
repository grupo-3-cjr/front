import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001',

});
const postUser = async () => {
    await api.post("/user")
}
