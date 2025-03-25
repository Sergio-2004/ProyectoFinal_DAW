export interface User {
  id: number;
  username: string;
  picture?: string;
  description: string;
  isAdmin: 0 | 1;
}
