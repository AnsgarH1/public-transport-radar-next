"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "./Button";

type AdressApiReturnType = { adresses: string[] };

export const LocationButton = () => {
  const [position, setPosition] = useState<GeolocationPosition>();
  const [positionError, setPositionError] = useState<GeolocationPositionError>();

  const [adress, setAdress] = useState<string>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition(position);
        },
        (error) => {
          setPositionError(error);
        },
        { enableHighAccuracy: true, timeout: 3000 }
      );
    } else {
      console.log("no geolocation in navigator!");
    }
  }, []);

  useEffect(() => {
    if (position?.coords) {
      const url = new URL("/api/geocode", window.origin);
      url.searchParams.append("latitude", position.coords.latitude.toString());
      url.searchParams.append("longitude", position.coords.longitude.toString());
      fetch(url)
        .then((response) => {
          return response.json() as Promise<AdressApiReturnType>;
        })
        .then((data) => {
          setAdress(data.adresses[1] || data.adresses[0]);
        });
    }
  }, [position]);

  const navigateToDepartures = () => {
    if (position?.coords) {
      const { longitude, latitude } = position.coords;
      window.location.assign(`departures?latitude=${latitude}&longitude=${longitude}`);
    } else {
      alert("no coords known, this shouldn't be possible");
    }
  };

  const coordString = useMemo(() => position && `${position.coords.latitude.toPrecision(6)},${position.coords.longitude.toPrecision(6)}`, [position]);

  return (
    <div>
      <Button disabled={!position} onClick={() => navigateToDepartures()}>
        Get Departures!
      </Button>
      {position?.coords ? (
        <p className="italic">
          Found position! <br />
          <span className="text-xs">{adress ?? coordString}</span>
        </p>
      ) : (
        <p>No Position found</p>
      )}
      {positionError && <p className="text-red-700">{positionError.message}</p>}
    </div>
  );
};
