type Props = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainProbability: number;
};

export default function WeatherInsights({
  temperature,
  humidity,
  windSpeed,
  rainProbability,
}: Props) {
  return (
    <div className="rounded-3xl bg-cyan-500/10 border border-cyan-500/20 p-6">

      <h2 className="text-2xl font-bold mb-4">
        🤖 AI Weather Insights
      </h2>

      <div className="space-y-3">

        <p>🌡 Temperature : {temperature}°C</p>

        <p>💧 Humidity : {humidity}%</p>

        <p>💨 Wind : {windSpeed} km/h</p>

        <p>🌧 Rain Chance : {rainProbability}%</p>

        <div className="mt-4 rounded-xl bg-black/5 p-4">

          <p>
            AI Summary:
          </p>

          <p className="mt-2 text-gray-300">
            Weather is suitable for normal outdoor activities.
            Monitor rain probability before planning field work.
          </p>

        </div>

      </div>

    </div>
  );
}