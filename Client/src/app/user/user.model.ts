export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}

export interface UserToLogin {
    email: string;
    password: string;
    isAdmin: boolean;
}

export enum Role
{
    User = 'User',
    Admin = 'Admin'
}