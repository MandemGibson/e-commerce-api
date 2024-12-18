import { Request } from "express";

export type User = {
  id?: string;
  email: string;
  password: string;
  name?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Admin = {
  id: string;
  email: string;
  password: string;
  role: number;
};