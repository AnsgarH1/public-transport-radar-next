import { HafasClient } from "hafas-client";
import { Suspense } from "react";
import { Departure } from "./Departure";

export const Station = async ({ stationId, stationName, hafasClient }: { stationId: string; stationName: string; hafasClient: HafasClient }) => {
  const results = await hafasClient.departures(stationId, {
    results: 20,
    duration: 30,
  });

  console.info("successful Hafas-Departures Response for " + stationName + " with " + results.departures.length + " results");
  return (
    <Suspense fallback={<p>lade {stationName}</p>}>
      <h3 className="text-lg font-semibold p-2   bg-slate-300 border-y ">{stationName}</h3>
      <ul>
        {results.departures.length ? (
          results.departures.map((departure) => <Departure departure={departure} key={departure.tripId} />)
        ) : (
          <p className="text-xs italic p-2"> ...keine Abfahrten in den nächsten Stunden!...</p>
        )}
      </ul>
    </Suspense>
  );
};
