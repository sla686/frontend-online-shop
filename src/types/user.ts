export interface User {
  id: number;
  name: string;
  role: UserRole;
  email: string;
  password: string;
  avatar: string;
}

export interface UserReducerState {
  userList: User[];
  currentUser: User | undefined;
}

export interface LoginType {
  email: string;
  password: string;
}

export type UserRole = "customer" | "admin";
