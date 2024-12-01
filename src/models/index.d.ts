
export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  isActive: boolean; 
}

export interface UsersState {
  searchQuery: string; 
  showActiveOnly: boolean; 
}