type Props = {
  humidity: number;
  windSpeed: number;
};

export default function AQICard({ humidity, windSpeed }: Props) {
  const aqi =
    humidity > 80
      ? "Poor"
      : humidity > 60
      ? "Moderate"
      : "Good";

  return (
    <div className="rounded-3xl bg-black/5 border border-black/10 p-6">
      <h2 className="text-2xl font-bold mb-4">🌫 Air Quality</h2>

      <p className="text-5xl font-bold text-cyan-400">{aqi}</p>

      <div className="mt-6 space-y-2">
        <p>Humidity : {humidity}%</p>
        <p>Wind : {windSpeed} km/h</p>
      </div>
    </div>
  );
}