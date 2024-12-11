import { CreateUserModel } from "@/schemas/createUserFormSchema";
import { api } from "./api";

export const createUser = async (data: CreateUserModel): Promise<any> => {
  const response = await api.post(`/register`, data);
  return response.data as any;
};
