from pydantic import BaseModel


class Location(BaseModel):
    latitude: float
    longitude: float
    timezone: str


class CurrentWeather(BaseModel):
    temperature: float
    feels_like: float
    humidity: int
    wind_speed: float
    pressure: float
    weather_code: int
    description: str
