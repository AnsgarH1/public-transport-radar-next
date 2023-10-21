"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";

export const LocationButton = () => {
  const [position, setPosition] = useState<GeolocationPosition>();
  const [positionError, setPositionError] = useState<GeolocationPositionError>();

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
  const navigateToDepartures = () => {
    if (position?.coords) {
      const { longitude, latitude } = position.coords;
      window.location.assign(`departures?latitude=${latitude}&longitude=${longitude}`);
    } else {
      alert("no coords known, this shouldn't be possible");
    }
  };

  return (
    <div>
      <Button disabled={!position} onClick={() => navigateToDepartures()}>
        Get Departures!
      </Button>
      {position?.coords ? (
        <p className="italic">
          Found position! <br />
          <span className="text-xs">
            {position.coords.latitude.toPrecision(6)},{position.coords.longitude.toPrecision(6)}
          </span>
        </p>
      ) : (
        <p>No Position found</p>
      )}
      {positionError && <p className="text-red-700">{positionError.message}</p>}
    </div>
  );
};
