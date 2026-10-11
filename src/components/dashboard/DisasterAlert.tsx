type Props = {
  rainProbability: number;
  windSpeed: number;
};

export default function DisasterAlert({
  rainProbability,
  windSpeed,
}: Props) {
  let alert = "🟢 Safe";

  if (rainProbability > 80) alert = "🔴 Heavy Rain Alert";
  else if (windSpeed > 40) alert = "🟠 High Wind Alert";

  return (
    <div className="rounded-3xl bg-red-500/10 border border-red-500/20 p-6">
      <h2 className="text-2xl font-bold mb-4">
        🚨 Disaster Alert
      </h2>

      <p className="text-3xl font-bold">
        {alert}
      </p>

      <div className="mt-5">
        <p>Rain Chance : {rainProbability}%</p>
        <p>Wind Speed : {windSpeed} km/h</p>
      </div>
    </div>
  );
}