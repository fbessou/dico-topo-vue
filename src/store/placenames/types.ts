// types.ts
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface PlacenameState {
  user?: User;
  error: boolean;
}
