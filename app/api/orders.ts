import { api } from "./api";
import { PagedResponse } from "@/models/pagedResponse";
import { CustomerResponse } from "@/models/customer/customerResponse.model";
import { CustomerRequest } from "@/models/customer/customerRequest.model";
import { OrderResponse } from "@/models/order/orderResponse.model";
import { OrderRequest } from "@/models/order/orderRequest.model";

export const fetchOrders = async (page: number, pageSize: number): Promise<PagedResponse<OrderResponse>> => {
  const response = await api.get(`/order`, {
    params: { page, pageSize },
  });
  return response.data;
};

export const fetchOrder = async (id: string): Promise<OrderResponse> => {
  const response = await api.get(`/order/${id}`);
  return response.data;
};

export const createOrder = async (item: OrderRequest): Promise<any> => {
  const response = await api.post(`/order`, item);
  return response.data;
};
