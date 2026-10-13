import Product from "@/models/Product.model";
import { Types } from "mongoose";

export type TProduct = {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number;
  images: string[];
  category: string;
  brand: string;
  stock: number;
  ratings: {
    average: number;
    count: number;
  };
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  specifications: Record<string, string>;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
};

export type TRole = "customer" | "admin" | "superadmin";

export type TPermission =
  | "product:read"
  | "product:write"
  | "order:read"
  | "order:write"
  | "user:read"
  | "user:write";

export type TAddress = {
  _id: Types.ObjectId;
  label: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};

export type Tuser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: TRole;
  permissions: TPermission[];
  avatar: string;
  phone: string;
  addresses: TAddress[];
  isVerified: boolean;
  resetPasswordToken: string;
  resetPasswordExpiry: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TJwtPayload = {
  userId: Types.ObjectId;
  email: string;
  role: TRole;
  permissions: TPermission[];
};
