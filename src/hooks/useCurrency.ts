import { useState } from "react";

export const useCurrency = () => {
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  const formatPrice = (price: string | number) => {
    const numericPrice =
      typeof price === "string"
        ? parseFloat(price.replace(/[^0-9.]/g, ""))
        : price;
    return `${currencySymbol}${numericPrice.toFixed(2)}`;
  };

  const getNumericPrice = (price: string | number) => {
    if (typeof price === "number") return price;
    return parseFloat(price.replace(/[^0-9.]/g, ""));
  };

  return {
    currencySymbol,
    setCurrencySymbol,
    formatPrice,
    getNumericPrice,
  };
};
