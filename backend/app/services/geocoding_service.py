import httpx


async def reverse_geocode(lat: float, lon: float):
    url = "https://nominatim.openstreetmap.org/reverse"

    params = {
        "lat": lat,
        "lon": lon,
        "format": "jsonv2"
    }

    headers = {
        "User-Agent": "WeatherLY/1.0"
    }

    async with httpx.AsyncClient(timeout=15) as client:
        response = await client.get(
            url,
            params=params,
            headers=headers
        )

        response.raise_for_status()

        data = response.json()

        address = data.get("address", {})

        return {
            "city": (
                address.get("city")
                or address.get("town")
                or address.get("village")
                or ""
            ),
            "state": address.get("state", ""),
            "country": address.get("country", "")
        }


async def search_city(query: str):
    url = "https://geocoding-api.open-meteo.com/v1/search"

    params = {
        "name": query,
        "count": 30,
        "language": "en",
        "format": "json"
    }

    async with httpx.AsyncClient(timeout=15) as client:
        response = await client.get(url, params=params)

        response.raise_for_status()

        data = response.json()

        results = data.get("results") or []

        # Strictly restrict to India only
        india_results = [
            item for item in results
            if item.get("country_code") == "IN" or (item.get("country") or "").strip().lower() == "india"
        ]

        return india_results