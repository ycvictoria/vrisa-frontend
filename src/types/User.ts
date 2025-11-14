export interface User {
  idUser: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  last_access?: string | null;
}