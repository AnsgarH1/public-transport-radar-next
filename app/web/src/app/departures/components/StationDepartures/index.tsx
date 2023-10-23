import { HafasClient } from "hafas-client";

import { Departure } from "../Departure";

export const StationDepartures = async ({ stationId, stationName, hafasClient }: { stationId: string; stationName: string; hafasClient: HafasClient }) => {
  const results = await hafasClient.departures(stationId, {
    results: 15,
    duration: 60,
  });

  return (
    <section>
      <h3 className="text-lg font-semibold p-2   bg-slate-300 dark:bg-slate-900 border-y ">{stationName}</h3>
      <ul>
        {results.departures.length ? (
          results.departures.map((departure) => <Departure departure={departure} key={departure.tripId} />)
        ) : (
          <p className="text-xs italic p-2"> keine Abfahrten in den nächsten 60 Minuten!</p>
        )}
      </ul>
    </section>
  );
};
