import axios from "axios";

class CurrencyConversion {
  static getExchangeRate = async (baseCurrency) => {
    const apiUrl = `https://v6.exchangerate-ai.com/v6/6b59ce616d41fe34914bb53c/latest/${baseCurrency}`;

    try {
      const res = await axios.get(apiUrl);
      if (res.data.result === "success") {  
         console.log("i m exchange rate api");          
          return  res.data.conversion_rates
      } else {
        console.error("Failed to fetch exchange rates:", res.error);
      }
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error);
    }
  };


  static convertCurrency =  () => {
  const exchangeRates = JSON.parse(localStorage.getItem("exchangesRates"))

  console.log(exchangeRates)
    
  }

}

export default CurrencyConversion