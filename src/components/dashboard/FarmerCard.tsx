type Props = {
  rainProbability: number;
  temperature: number;
};

export default function FarmerCard({
  rainProbability,
  temperature,
}: Props) {
  let advice =
    "Good weather for farming.";

  if (rainProbability > 70)
    advice = "Avoid spraying pesticides.";

  if (temperature > 38)
    advice = "Provide irrigation to crops.";

  return (
    <div className="rounded-3xl bg-green-500/10 border border-green-500/20 p-6">

      <h2 className="text-2xl font-bold mb-4">
        🌾 Farmer Advisory
      </h2>

      <p className="text-lg">
        {advice}
      </p>

      <div className="mt-5 space-y-2">
        <p>🌡 {temperature}°C</p>
        <p>🌧 {rainProbability}%</p>
      </div>

    </div>
  );
}