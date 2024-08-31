import { User } from "../models/userModel";
import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import api from "../api";

async function handleError(response: any) {
    const errorBody = response.data || {};
    const errorMessage = errorBody.error || response.statusText;
    if (response.status === 401) {
        throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
        throw new ConflictError(errorMessage);
    } else {
        throw new Error("Request failed with status: " + response.status + " message: " + errorMessage);
    }
}

export async function getLoggedInUser(): Promise<User> {
    try {
        const response = await api.get('/api/users', { withCredentials: true });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            handleError(error.response);
        }
        throw error;
    }
}

export interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    try {
        const response = await api.post('/api/users/signup', credentials, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            handleError(error.response);
        }
        throw error;
    }
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
    try {
        const response = await api.post('/api/users/login', credentials, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            handleError(error.response);
        }
        throw error;
    }
}

export async function logout() {
    try {
        await api.post("/api/users/logout", {}, { withCredentials: true });
    } catch (error: any) {
        if (error.response) {
            handleError(error.response);
        }
        throw error;
    }
}

export interface UserInput {
    username: string;
    email: string;
    password: string;
}

export interface UserUpdate {
    username?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    phoneNumber?: string;
    address?: string;
    favoriteBook?: string;
    favoriteGenres?: string[];
}

export async function createUser(user: UserInput): Promise<User> {
    try {
        const response = await api.post("/api/users", user, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            handleError(error.response);
        }
        throw error;
    }
}

export async function updateProfile(userId: string, user: UserUpdate): Promise<User> {
    try {
        const response = await api.patch(`/api/users/${userId}`, user, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            handleError(error.response);
        }
        throw error;
    }
}

export async function updateUser(userId: string, user: UserUpdate): Promise<User> {
    try {
        const response = await api.patch(`/api/users/${userId}`, user, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            handleError(error.response);
        }
        throw error;
    }
}

export const getUserProfile = async () => {
    try {
        const response = await api.get('/api/users');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            handleError(error.response);
        }
        throw error;
    }
};

export async function deleteUser(userId: string) {
    try {
        await api.delete(`/api/users/${userId}`);
    } catch (error: any) {
        if (error.response) {
            handleError(error.response);
        }
        throw error;
    }
}

export const getUserById = async (userId: string) => {
    try {
        const response = await api.get(`/api/users/${userId}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            handleError(error.response);
        }
        throw error;
    }
}

export const updateUserProfile = async (userId: string, updatedData: Partial<User>) => {
    try {
        const response = await api.patch(`/api/users/${userId}`, updatedData);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            handleError(error.response);
        }
        throw error;
    }
};
