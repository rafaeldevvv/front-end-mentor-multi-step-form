import { Plans, ID } from "./types";

export interface IPlan {
  name: Plans;
  monthlyPrice: number;
  icon: string;
  yearlyPrice: number;
  id: ID;
}

export interface IFormData {
  name: string;
  email: string;
  phoneNumber: string;
  selectedPlanId: ID;
  isYearlyBillingEnabled: boolean;
  selectedAddonsIds: ID[];
}

export interface IAddon {
  name: string;
  desc: string;
  monthlyPrice: number;
  yearlyPrice: number;
  id: ID;
}

export interface IPriceObj {
  monthlyPrice: number;
  yearlyPrice: number;
}

export interface IInputChange {
  name: string;
  value: number | string;
}

export interface IError {
  name: string;
  message: string;
}