function CurrencyConverter(currency: string) {
  let resultCurrency = "";
  if (currency === "USD" || currency === "CAD") {
    resultCurrency = "$";
  } else if (currency === "EUR") {
    resultCurrency = "€";
  } else if (currency === "INR") {
    resultCurrency = "₹";
  }
  return resultCurrency;
}

export default CurrencyConverter;
