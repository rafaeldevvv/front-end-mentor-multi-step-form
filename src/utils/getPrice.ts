import { IPriceObj } from "../interfaces";

export default function getPrice(obj: IPriceObj, yearly: boolean) {
  return yearly ? obj.yearlyPrice : obj.monthlyPrice;
}
