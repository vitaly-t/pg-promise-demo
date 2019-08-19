/*
  Here we typed in simple models manually. But there are many tools out there
  for generating database models automatically, from an existing database.

  For example, schemats: https://github.com/sweetiq/schemats
*/

export interface User {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    user_id: number;
    name: string;
}
