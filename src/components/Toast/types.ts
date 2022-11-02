export type IToastColor = "primary" | "success" | "warning" | "danger";
export interface IToast {
  title: string;
  text: any;
  color: IToastColor;
  id: string;
}

export interface IAddToast {
  title: string;
  color: IToastColor;
  text: string;
}
