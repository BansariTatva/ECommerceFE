import type { AxiosInstance } from "axios";
import api from "./axiosInstance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class BaseService<T extends { id?: string | number }, Q = Record<string, any>> {
  protected http: AxiosInstance;
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.http = api;
  }

  async getAll(params?: Q): Promise<T[]> {
    return api.get<T[]>(`/${this.endpoint}`, { params });
  }

  async getById(id: string | number): Promise<T> {
    return api.get(`/${this.endpoint}/${id}`);
  }

  async create(data: Omit<T, "id">): Promise<T> {
    return api.post(`/${this.endpoint}`, data);
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    return api.put(`/${this.endpoint}/${id}`, data);
  }

  async delete(id: string | number): Promise<void> {
    return api.delete(`/${this.endpoint}/${id}`);
  }
}

export default BaseService;
