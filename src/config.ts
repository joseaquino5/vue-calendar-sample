const _env = process.env;

export const WEATHER_API = {
  BASE_URL: _env.VUE_APP_WEATHER_FORECAST_API_URL,
  APPID: _env.VUE_APP_WEATHER_FORECAST_API_APPID,
  TIMEOUT: 30000,
};