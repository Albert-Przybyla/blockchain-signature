import { api } from "./api";
import { PagedResponse } from "@/models/pagedResponse";
import { CustomerResponse } from "@/models/customer/customerResponse.model";
import { CustomerRequest } from "@/models/customer/customerRequest.model";

export const fetchCustomers = async (page: number, pageSize: number): Promise<PagedResponse<CustomerResponse>> => {
  const response = await api.get(`/customer`, {
    params: { page, pageSize },
  });
  return response.data;
};

export const fetchCustomer = async (id: string): Promise<CustomerResponse> => {
  const response = await api.get(`/customer/${id}`);
  return response.data;
};

export const createCustomer = async (item: CustomerRequest): Promise<any> => {
  const response = await api.post(`/customer`, item);
  return response.data;
};
