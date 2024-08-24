import { User } from '../models/userModel';

async function fetchData(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const response = await fetch(input, init);
    if (!response.ok) {
        return response;
    }else{
        const errorBody = await response.json();
        const errorMessage = errorBody.message || response.statusText;
        throw Error(errorMessage);
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData('/api/users', {method: 'GET', credentials: 'include'});
    return await response.json();
}

export  interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData('/api/users/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials),
        credentials: 'include'
    });
    return await response.json();
}

export interface LoginCredentials {
    username: string;
    password: string;
}   

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData('/api/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials),
        credentials: 'include'
    });
    return await response.json();
}

export async function logout(): Promise<void> {
    await fetchData('/api/users/logout', {method: 'POST', credentials: 'include'});
}

export interface UserInput {
    username: string;
    email: string;
    password: string;
}

export function updateUser(_id: string, data: UserInput): User | PromiseLike<User> {
    throw new Error("Function not implemented.");
}
export function createUser(data: UserInput): User | PromiseLike<User> {
    throw new Error("Function not implemented.");
}

