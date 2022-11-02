import { Moment } from "moment";

export interface IApiResponse {
  data: any;
  error: any;
  hasError: boolean;
}

export interface IItem {
  _id?: string;
  title: string;
  description: string;
  date: string;
  type: string;
}
