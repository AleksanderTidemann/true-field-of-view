// filter forecastData from the YR API
export const filterForecast = data => {
  const currTime = Date();
  const currHour = currTime.slice(16, 18);
  const earliestHour = "21";
  const latestHour = "03";
  let idx;

  // We are only interested in one weather forcast at night time.
  // IF its night already, we find the current hour and return it.
  if (currHour >= earliestHour || currHour <= latestHour) {
    idx = data.findIndex(item => {
      return item.time.slice(11, 13) === currHour;
    });
  } else {
    idx = data.findIndex(item => {
      return item.time.slice(11, 13) === earliestHour;
    });
  }
  const forecast = data[idx];
  const forecastTime = forecast.time.slice(11, 16);
  const forecastDay = forecast.time.slice(8, 10);
  const forecastMonth = forecast.time.slice(5, 7);
  const forecastDate = forecastDay + "/" + forecastMonth;

  return { forecast, forecastTime, forecastDate };
};
