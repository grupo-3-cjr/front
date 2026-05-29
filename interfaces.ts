export interface CreateUser{ 
    name: string;
    email: string;
    password: string;
    username?: string;            // Opcional
    profile_picture_url?: string; // Opcional
}

export interface Login {
    email: string;
    password: string;
}