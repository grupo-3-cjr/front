import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001', //util pois não precisa digitar a url toda vez que for fazer a requisicão
});

export interface CreateUser{ //basicamente é um struct  que define o formato exato que os dados devem ter
    //o exporte permite importar o molde
    name: string;
    email: string;
    password: string;
    username?: string;            // Opcional
    profile_picture_url?: string; // Opcional
}
 //cria uma funçaõ assincrona que recebe uma variável da minha "struct" createUser
 // o export diz que a minha funçaõ pode ser usada no meu fórmulário
export const postUser = async (userData: CreateUser) => {
    const response = await api.post("/user", userData); // é a requisição para rota definida com o paremetro useData
    // o axios transforma o userData em JSON e envia para o body do back

    return response.data; //pega a resposta do back
}
export default api;