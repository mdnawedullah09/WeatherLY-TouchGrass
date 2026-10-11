import httpx

OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"

WEATHER_CODES = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Freezing Drizzle",
    57: "Heavy Freezing Drizzle",
    61: "Light Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Freezing Rain",
    67: "Heavy Freezing Rain",
    71: "Light Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    77: "Snow Grains",
    80: "Rain Showers",
    81: "Heavy Rain Showers",
    82: "Violent Rain Showers",
    85: "Snow Showers",
    86: "Heavy Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with Hail",
    99: "Severe Thunderstorm with Hail"
}


async def fetch_weather(params: dict):
    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.get(OPEN_METEO_URL, params=params)
        response.raise_for_status()
        return response.json()


async def get_current_weather(lat: float, lon: float):
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "is_day",
            "precipitation",
            "rain",
            "snowfall",
            "weather_code",
            "cloud_cover",
            "pressure_msl",
            "wind_speed_10m",
            "wind_direction_10m"
        ],
        "timezone": "auto"
    }

    data = await fetch_weather(params)

    current = data["current"]

    return {
        "success": True,
        "location": {
            "latitude": lat,
            "longitude": lon,
            "timezone": data.get("timezone")
        },
        "current": {
            "temperature": current["temperature_2m"],
            "feels_like": current["apparent_temperature"],
            "humidity": current["relative_humidity_2m"],
            "wind_speed": current["wind_speed_10m"],
            "wind_direction": current["wind_direction_10m"],
            "pressure": current["pressure_msl"],
            "cloud_cover": current["cloud_cover"],
            "weather_code": current["weather_code"],
            "description": WEATHER_CODES.get(
                current["weather_code"],
                "Unknown"
            ),
            "is_day": current["is_day"],
            "precipitation": current["precipitation"],
            "rain": current["rain"],
            "snowfall": current["snowfall"]
        }
    }


async def get_hourly_forecast(lat: float, lon: float):

    params = {
        "latitude": lat,
        "longitude": lon,
        "hourly": [
            "temperature_2m",
            "relative_humidity_2m",
            "precipitation_probability",
            "weather_code",
            "wind_speed_10m"
        ],
        "forecast_days": 2,
        "timezone": "auto"
    }

    data = await fetch_weather(params)

    hourly = data["hourly"]

    result = []

    for i in range(len(hourly["time"])):
        result.append({
            "time": hourly["time"][i],
            "temperature": hourly["temperature_2m"][i],
            "humidity": hourly["relative_humidity_2m"][i],
            "rain_probability": hourly["precipitation_probability"][i],
            "wind_speed": hourly["wind_speed_10m"][i],
            "weather_code": hourly["weather_code"][i],
            "description": WEATHER_CODES.get(
                hourly["weather_code"][i],
                "Unknown"
            )
        })

    return {
        "success": True,
        "count": len(result),
        "data": result
    }


async def get_daily_forecast(lat: float, lon: float):

    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_probability_max",
            "wind_speed_10m_max",
            "sunrise",
            "sunset"
        ],
        "forecast_days": 7,
        "timezone": "auto"
    }

    data = await fetch_weather(params)

    daily = data["daily"]

    forecast = []

    for i in range(len(daily["time"])):
        forecast.append({
            "date": daily["time"][i],
            "max_temp": daily["temperature_2m_max"][i],
            "min_temp": daily["temperature_2m_min"][i],
            "rain_probability": daily["precipitation_probability_max"][i],
            "wind_speed": daily["wind_speed_10m_max"][i],
            "sunrise": daily["sunrise"][i],
            "sunset": daily["sunset"][i],
            "weather_code": daily["weather_code"][i],
            "description": WEATHER_CODES.get(
                daily["weather_code"][i],
                "Unknown"
            )
        })

    return {
        "success": True,
        "count": len(forecast),
        "data": forecast
    }


async def get_marine_weather(lat: float, lon: float):
    url = "https://marine-api.open-meteo.com/v1/marine"
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": ["wave_height", "wave_direction", "wave_period"],
        "timezone": "auto"
    }
    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.get(url, params=params)
        
        # If location is not on ocean, API might return 400 or empty data
        if response.status_code != 200:
            return {"success": False, "error": "Marine data not available for this location."}
            
        data = response.json()
        current = data.get("current", {})
        return {
            "success": True,
            "current": {
                "wave_height": current.get("wave_height", 0),
                "wave_direction": current.get("wave_direction", 0),
                "wave_period": current.get("wave_period", 0)
            }
        }


async def get_aviation_weather(lat: float, lon: float):
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": [
            "visibility",
            "wind_speed_10m",
            "wind_direction_10m",
            "wind_gusts_10m",
            "cloud_cover"
        ],
        "timezone": "auto"
    }
    data = await fetch_weather(params)
    current = data.get("current", {})
    return {
        "success": True,
        "current": {
            "visibility": current.get("visibility", 0),
            "wind_speed": current.get("wind_speed_10m", 0),
            "wind_direction": current.get("wind_direction_10m", 0),
            "wind_gusts": current.get("wind_gusts_10m", 0),
            "cloud_cover": current.get("cloud_cover", 0)
        }
    }


async def get_agro_weather(lat: float, lon: float):
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": [
            "temperature_2m",
            "precipitation",
            "rain",
            "soil_temperature_0cm",
            "soil_moisture_0_to_1cm"
        ],
        "timezone": "auto"
    }
    data = await fetch_weather(params)
    current = data.get("current", {})
    return {
        "success": True,
        "current": {
            "temperature": current.get("temperature_2m", 0),
            "precipitation": current.get("precipitation", 0),
            "soil_temperature": current.get("soil_temperature_0cm", 0),
            "soil_moisture": current.get("soil_moisture_0_to_1cm", 0)
        }
    }