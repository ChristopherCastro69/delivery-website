// app/track/[id]/TrackClient.tsx
"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import L from "leaflet";

const Map = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

// Set default icon options
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function TrackClient() {
  const [customerLocation, setCustomerLocation] =
    useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCustomerLocation(position);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const startingLocation = { latitude: 11.2527, longitude: 124.0054 };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Track Your Location</h1>
      {customerLocation ? (
        <Map
          center={[
            customerLocation.coords.latitude,
            customerLocation.coords.longitude,
          ]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker
            position={[
              customerLocation.coords.latitude,
              customerLocation.coords.longitude,
            ]}
          />
          <Marker
            position={[startingLocation.latitude, startingLocation.longitude]}
          />
          <Polyline
            positions={[
              [startingLocation.latitude, startingLocation.longitude],
              [
                customerLocation.coords.latitude,
                customerLocation.coords.longitude,
              ],
            ]}
            color="blue"
          />
        </Map>
      ) : (
        <p className="text-sm sm:text-base md:text-lg">
          {error || "Requesting location..."}
        </p>
      )}
    </div>
  );
}
