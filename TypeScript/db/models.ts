export interface User {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    user_id: number;
    name: string;
}
