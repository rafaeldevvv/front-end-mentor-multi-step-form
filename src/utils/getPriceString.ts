export default function getPriceString(price: number, yearly: boolean) {
  const dollarUnit = price !== 1 ? "dollars" : "dollar";
  return {
    price: `$${price}/${yearly ? "yr" : "mo"}`,
    srPrice: `${price} ${dollarUnit} per ${yearly ? "year" : "month"}`,
  };
}
