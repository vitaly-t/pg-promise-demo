/*
  Here we typed in simple models manually. But there are many tools out there
  for generating database models automatically, from an existing database.

  For example, schemats: https://github.com/sweetiq/schemats
*/

export interface IUser {
    id: number;
    name: string;
}

export interface IProduct {
    id: number;
    user_id: number;
    name: string;
}
