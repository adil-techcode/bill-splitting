const weekPercentage = (currentWeekRegistrations,previousWeekRegistrations) => {
   
    const percentageIncrease = ((currentWeekRegistrations - previousWeekRegistrations) / previousWeekRegistrations) * 100;
    return percentageIncrease;
  };
  
  export default weekPercentage;