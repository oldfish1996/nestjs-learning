export type User = {
  id: number;
  name: string;
  age: number;
};

export type CreateUserBody = {
  name: string;
  age: number;
};

export type UpdateUserBody = {
  name?: string;
  age?: number;
};
