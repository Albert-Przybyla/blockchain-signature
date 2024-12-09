import * as SecureStore from "expo-secure-store";
import { api } from "./api";
import { PagedResponse } from "@/models/pagedResponse";
import { TransferResponse } from "@/models/transfer/transferResponse.model";

export const fetchTransfers = async (page: number, pageSize: number): Promise<PagedResponse<TransferResponse>> => {
  const response = await api.get(`/transfer`, {
    params: { page, pageSize },
  });
  return response.data;
};
