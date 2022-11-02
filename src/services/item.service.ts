import axios, { AxiosError, AxiosResponse } from "axios";
import { IApiResponse, IItem } from "../utils/types";

class MapService {
  static api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  static prefix = "item";

  static getAllItems = async ({
    pageSize,
    currentPage,
  }: {
    pageSize: number;
    currentPage: number;
  }) => {
    try {
      const query = `?page=${currentPage}&limit=${pageSize}`;
      const response = await this.api.get(this.prefix + "/" + query);

      return handleResponse(response);
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  static getItemTypes = async () => {
    try {
      const response = await this.api.get(this.prefix + "/types");

      return handleResponse(response);
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  static createItem = async (data: IItem) => {
    try {
      const response = await this.api.post(this.prefix, data);

      return handleResponse(response);
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  static deleteItem = async (ItemId: string) => {
    try {
      const response = await this.api.delete(this.prefix + "/" + ItemId);

      return handleResponse(response);
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  static getItem = async (ItemId: string) => {
    try {
      const response = await this.api.get(this.prefix + "/" + ItemId);

      return handleResponse(response);
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  static updateItem = async (Item: IItem) => {
    try {
      const response = await this.api.put(this.prefix + "/" + Item._id, Item);

      return handleResponse(response);
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };
}

const handleResponse = (response: AxiosResponse) => {
  return { data: response?.data, hasError: false, error: null };
};

const handleError = (err: AxiosError) => {
  const res: IApiResponse = {
    data: null,
    hasError: true,
    error: `${err.response?.data}`,
  };
  return res;
};
export default MapService;
