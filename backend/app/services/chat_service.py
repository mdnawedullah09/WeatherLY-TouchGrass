import json
from functools import lru_cache

from google import genai

from app.core.config import settings
from app.services.weather_service import get_current_weather, get_agro_weather, get_aviation_weather, get_marine_weather

@lru_cache(maxsize=1)
def get_client():
    if not settings.GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY is not configured")
    return genai.Client(api_key=settings.GEMINI_API_KEY)


async def ask_weather_ai(message: str, history: list, lat: float, lon: float, lang: str = "hi-IN"):

    weather = await get_current_weather(lat, lon)
    current = weather.get("current", {})

    agro = await get_agro_weather(lat, lon)
    agro_current = agro.get("current", {})

    aviation = await get_aviation_weather(lat, lon)
    avi_current = aviation.get("current", {})

    marine = await get_marine_weather(lat, lon)
    mar_current = marine.get("current", {}) if marine.get("success") else "No marine data (inland location)"

    sys_instruction = f"""
You are WeatherLY, an intelligent AI Assistant similar to Gemini but specialized in weather, agriculture, aviation, and marine data.

Location Data:
Weather: Temp {current.get('temperature')}°C, Humidity {current.get('humidity')}%, Wind {current.get('wind_speed')}km/h, {current.get('description')}
Agriculture: Soil Temp {agro_current.get('soil_temperature')}°C, Soil Moisture {agro_current.get('soil_moisture')}, Precip {agro_current.get('precipitation')}mm
Aviation: Visibility {avi_current.get('visibility')}m, Wind gusts {avi_current.get('wind_gusts')}km/h, Cloud cover {avi_current.get('cloud_cover')}%
Marine: {mar_current}

Instructions:
1. Answer naturally and contextually based on the conversation history.
2. Be helpful with general questions, but use the provided data if they ask about weather, farming, flights/aviation, or sea/marine.
3. Keep the answer concise (60-120 words).
4. Detect the city name from the user's message if mentioned. If no city is mentioned, return an empty string for city.
5. CRITICAL: Reply ONLY in the language corresponding to this locale code: {lang}. For example, if {lang} is 'hi-IN', reply in pure Hindi script. If it is 'te-IN', reply in Telugu script. Ensure regional nuances are kept intact so text-to-speech works perfectly.

Return ONLY valid JSON.
Example:
{{
  "city": "",
  "reply": ""
}}
"""

    contents = []
    if history:
        for msg in history:
            role = "user" if msg.role == "user" else "model"
            contents.append(
                genai.types.Content(
                    role=role,
                    parts=[genai.types.Part.from_text(text=msg.content)]
                )
            )
            
    contents.append(
        genai.types.Content(
            role="user",
            parts=[genai.types.Part.from_text(text=message)]
        )
    )

    response = get_client().models.generate_content(
        model=settings.GEMINI_MODEL,
        contents=contents,
        config=genai.types.GenerateContentConfig(
            system_instruction=sys_instruction,
            temperature=0.7
        )
    )

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "", 1)
    if text.startswith("```"):
        text = text.replace("```", "", 1)
    if text.endswith("```"):
        text = text[:-3]

    text = text.strip()

    try:
        return json.loads(text)
    except Exception:
        return {
            "city": "",
            "reply": text,
        }