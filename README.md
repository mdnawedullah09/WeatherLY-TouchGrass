# 🌦️ WeatherLY

## Smart India Hackathon (SIH) Project

**Team Name:** Green Innovators  
**Project:** WeatherLY – AI-Powered Weather Assistant

WeatherLY is an AI-powered weather platform designed to make weather information easier to understand, access, and use. It combines real-time weather data with conversational AI so users can ask weather-related questions naturally and receive useful, location-based information.

The project is developed as a prototype for the **Smart India Hackathon (SIH)**, focusing on accessible, intelligent, and user-friendly weather information.

---

## 👥 Team Green Innovators

| Team Member | Role |
|---|---|
| **Nawedullah Saif** | Team Leader & Presenter |
| **Ratan Raj Prince** | Programmer |
| **Deep Bhattachrya** | PPT Maker |
| **Rohit Raj** | Researcher |
| **Chandani Kumari** | Presenter |

---

## 🎯 Project Objective

WeatherLY aims to provide a single platform where users can:

- Get real-time weather information
- Ask weather questions using natural language
- Search weather information by location
- Get AI-powered weather assistance
- Access weather information through a simple conversational interface
- Explore specialized weather information for different use cases

---

## ✨ Key Features

### 🌤️ Real-Time Weather
Get current weather conditions and forecast information for a selected location.

### 🤖 AI Weather Chat
Interact with WeatherGPT using natural-language questions and receive AI-generated responses.

### 📍 Location & Geocoding
Search for locations and retrieve weather information based on geographical coordinates.

### 🚨 Weather Alerts
Support for important weather-condition notifications and alerts.

### 🌾 Agriculture Support
Weather information can support agriculture-related decisions.

### ✈️ Aviation Weather
Provides a foundation for aviation-focused weather information.

### 🌊 Marine Weather
Provides a foundation for marine and coastal weather information.

### 📊 Climate Analytics
The platform can be extended to analyze historical weather and climate trends.

### 🎬 Eco Reels
A climate-awareness and conservation-oriented content feature designed to encourage environmental awareness.

### 🌐 Multilingual Support
The architecture can be extended to support multiple Indian languages.

---

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Leaflet
- Recharts
- Axios

### Backend
- Python
- FastAPI
- Pydantic

### AI
- Google Gemini API

### Weather & Location
- Open-Meteo API
- Geocoding APIs

### Deployment
- Vercel
- Serverless FastAPI API

---

## 📁 Project Structure

```text
WeatherGPT/
│
├── SIH/                       # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
│
├── api/
│   └── index.py              # Vercel FastAPI entry point
│
├── requirements.txt
├── vercel.json
└── README.md
```



## 🔐 Environment Variables

Configure these locally and in Vercel:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
OPENMETEO_BASE_URL=https://api.open-meteo.com/v1
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> **Important:** Never commit `.env` files or API keys to GitHub.

---

## ☁️ Vercel Deployment

The project is structured for Vercel deployment with:

- React/Vite frontend
- FastAPI backend
- `/api/*` backend routes
- Environment variables
- `vercel.json`
- `api/index.py`

Configure environment variables in:

```text
Vercel Dashboard
→ Project
→ Settings
→ Environment Variables
```

Then deploy the project.

---

## 🔌 API Routes

```text
/api/weather/*
/api/chat/
/api/geocoding/*
/api/community/*
/api/reels/*
```

---

## 🔒 Security

For production deployment:

- Keep API keys in environment variables.
- Never upload `.env` files.
- Never commit `node_modules` or Python virtual environments.
- Use a strong `JWT_SECRET`.
- Use a cloud database such as MongoDB Atlas for persistent production data.

---

## 🌱 Future Scope

- 🌐 Multilingual Indian language support
- 🗣️ Voice-based weather interaction
- 🌾 Advanced agricultural recommendations
- ✈️ Advanced aviation weather information
- 🌊 Marine weather intelligence
- 🚨 Severe weather alerts
- 📈 Long-term climate trend analysis
- 🛰️ Additional meteorological datasets
- 🧠 Advanced AI-based weather reasoning
- 📱 Mobile/PWA version

---

## 🏆 Smart India Hackathon

**WeatherLY** is an SIH-oriented prototype developed by **Team Green Innovators**.

The project combines **Artificial Intelligence, real-time weather data, conversational interaction, and an accessible user interface** to create a smarter weather-information platform.

### Team Green Innovators

- **Nawedullah Saif** — Team Leader & Presenter
- **Ratan Raj Prince** — Programmer
- **Deep Bhattachrya** — PPT Maker
- **Rohit Raj** — Researcher
- **Chandani Kumari** — Presenter

---

## 📄 License

This project is developed as an educational and hackathon prototype for Smart India Hackathon.

---

**Made with ❤️ by Team Green Innovators**
