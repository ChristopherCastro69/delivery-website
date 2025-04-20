// Add this line at the top of the file
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

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

const TrackPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
          // Logic to store the location in the database with the unique id
          console.log("Location:", position);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
        Track Your Location
      </h1>
      {location ? (
        <div>
          <p className="text-sm sm:text-base md:text-lg">
            Latitude: {location.coords.latitude}
          </p>
          <p className="text-sm sm:text-base md:text-lg">
            Longitude: {location.coords.longitude}
          </p>
          <Map
            center={[location.coords.latitude, location.coords.longitude]}
            zoom={13}
            className="h-48 sm:h-64 md:h-80 w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Marker
              position={[location.coords.latitude, location.coords.longitude]}
            />
          </Map>
        </div>
      ) : (
        <p className="text-sm sm:text-base md:text-lg">
          {error || "Requesting location..."}
        </p>
      )}
    </div>
  );
};

export default TrackPage;
