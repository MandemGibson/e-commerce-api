export type User = {
  id?: string;
  email: string;
  password: string;
  name?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  role?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Admin = {
  id: string;
  email: string;
  password: string;
  role: number;
};

export type Product = {
  id?: string;
  productName: string;
  brand: string;
  model?: string;
  storage?: string;
  color?: string;
  os?: string;
  batteryCapacity?: number;
  type?: string;
  compatibility?: string;
  price: number;
  description: string;
  quantity: number;
  categoryId: string | null;
  imageUrl: string;
  warranty: string;
  dimensions: string;
  condition: "NEW" | "REFURBISHED" | "USED" ;
  availability: boolean;
};

export type Category = {
  id?: string;
  name: string;
};
