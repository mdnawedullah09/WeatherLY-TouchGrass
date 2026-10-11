from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "WeatherLY API"
    APP_VERSION: str = "2.0.0"
    DEBUG: bool = True

    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.5-flash"

    OPENMETEO_BASE_URL: str = "https://api.open-meteo.com/v1"

    MONGODB_URI: str = ""
    JWT_SECRET: str = "weatherly_secret_key"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True
    )


settings = Settings()
