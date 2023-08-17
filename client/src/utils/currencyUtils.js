
const getExchangesRates = (targetCurrency, amount) => {
    const exchangeRates = JSON.parse(localStorage.getItem("exchangesRates"));
  
    // Convert user-provided currency amount to the base currency
    const convertedToBaseAmount = exchangeRates
      ? (amount / exchangeRates[targetCurrency]).toFixed(2)
      : null;
  
      console.log(convertedToBaseAmount)
    return convertedToBaseAmount;
  };
  
  export default getExchangesRates;