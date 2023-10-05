import * as React from "react";
import { FC } from "react";
import getPriceString from "../utils/getPriceString";

interface IPrice {
  price: number;
  yearly: boolean;
  className?: string;
}
const Price: FC<IPrice> = ({ price, yearly, className = "" }) => {
  const priceString = getPriceString(price, yearly);
  return (
    <>
      <span aria-hidden="true" className={className}>
        {priceString.price}
      </span>
      <span className="sr-only">{priceString.srPrice}</span>
    </>
  );
};

export default Price;
