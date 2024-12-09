import * as SecureStore from "expo-secure-store";
import { api } from "./api";
import { PagedResponse } from "@/models/pagedResponse";
import { ItemResponse } from "@/models/item/itemResponse.model";
import { ItemRequest } from "@/models/item/itemRequest.model";

export const fetchItems = async (page: number, pageSize: number): Promise<PagedResponse<ItemResponse>> => {
  const response = await api.get(`/item`, {
    params: { page, pageSize },
  });
  return response.data;
};

export const fetchItem = async (id: string): Promise<ItemResponse> => {
  const response = await api.get(`/item/${id}`);
  return response.data;
};

export const createItem = async (item: ItemRequest): Promise<any> => {
  const response = await api.post(`/item`, item);
  return response.data;
};
