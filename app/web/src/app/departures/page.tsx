import { Suspense } from "react";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import { StationDepartures } from "./components/StationDepartures";
import { createClient, Location as HafasLocation } from "hafas-client";
import { profile as rmvProfile } from "hafas-client/p/rmv";

import { Adress } from "./components/Adress/Adress";
import { AdressSkeleton } from "./components/Adress/loading";

import { StationDeparturesSkeleton } from "./components/StationDepartures/loading";
import { DepartureSkeleton } from "./components/Departure/loading";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const coordinateSchema = z.object({
    latitude: z.string().transform((input) => Number.parseFloat(input)),
    longitude: z.string().transform((input) => Number.parseFloat(input)),
    distance: z
      .string()
      .default("400")
      .transform((input) => Number.parseFloat(input)),
  });

  const parsedInput = coordinateSchema.safeParse(searchParams);

  if (!parsedInput.success) {
    const errorMessage = fromZodError(parsedInput.error);
    console.warn("Input Error", errorMessage.message);
    return <p>{errorMessage.toString()}</p>;
  }
  const { latitude, longitude, distance } = parsedInput.data;

  const hafasClient = createClient(rmvProfile, "ansg.hoy+hafasClientApp@gmail.com");

  const hafasLocation: HafasLocation = {
    latitude,
    longitude,
    type: "location",
  };

  const stations = await hafasClient.nearby(hafasLocation, { distance });
  return (
    <main className="h-screen overflow-y-auto">
      <Suspense fallback={<AdressSkeleton />}>
        <Adress latitude={latitude} longitude={longitude} />
      </Suspense>
      <Suspense
        fallback={
          <ul>
            <StationDeparturesSkeleton />
            <StationDeparturesSkeleton />
            <StationDeparturesSkeleton />
          </ul>
        }
      >
        <ul>
          {stations.map(
            (station) =>
              station.id &&
              station.name && (
                <Suspense
                  key={station.id}
                  fallback={
                    <section>
                      <h3 className="text-lg font-semibold p-2   bg-slate-300 dark:bg-slate-900 border-y ">{station.name}</h3>
                      <ul>
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                        <DepartureSkeleton />
                      </ul>
                    </section>
                  }
                >
                  <StationDepartures key={station.id} hafasClient={hafasClient} stationId={station.id} stationName={station.name} />
                </Suspense>
              )
          )}
        </ul>
      </Suspense>
    </main>
  );
}
