import { motion } from "framer-motion";
import { MapPinned } from "lucide-react";
import { useEffect } from "react";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ChangeView({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], map.getZoom());
  }, [lat, lon, map]);

  return null;
}

type Props = {
  lat: number;
  lon: number;
  city: string;
};

export default function WeatherRadar({
  lat,
  lon,
  city,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-black/10 bg-black/5 p-6 backdrop-blur-xl"
    >
      <div className="mb-5 flex items-center gap-3">
        <MapPinned className="text-cyan-400" size={26} />

        <h2 className="text-2xl font-bold text-slate-900">
          Live Weather Radar
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl">

        <MapContainer
          center={[lat, lon]}
          zoom={10}
          scrollWheelZoom={true}
          className="h-[500px] w-full"
        >
                    <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

                    <ChangeView lat={lat} lon={lon} />

          <Marker
            position={[lat, lon]}
            icon={markerIcon}
          >
            <Popup>{city}</Popup>
          </Marker>

        </MapContainer>

      </div>
    </motion.div>
  );
}