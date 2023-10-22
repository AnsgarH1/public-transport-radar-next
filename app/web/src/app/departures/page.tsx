import { createClient, Location as HafasLocation } from "hafas-client";
import { profile as rmvProfile } from "hafas-client/p/rmv";
import { Suspense } from "react";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import { Station } from "./components/Station";

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
  console.info("Parsed URL Params: lat", latitude, "lon" + longitude, "dist" + distance);

  const hafasClient = createClient(rmvProfile, "ansg.hoy+hafasClientApp@gmail.com");

  const hafasLocation: HafasLocation = {
    latitude,
    longitude,
    type: "location",
  };

  const stations = await hafasClient.nearby(hafasLocation, { distance });
  console.info("successful Hafas-Nearby Response with " + stations.length + " results");
  return (
    <Suspense fallback={<p>loading...</p>}>
      <main className="h-screen overflow-y-auto">
        <ul>{stations.map((station) => station.id && station.name && <Station key={station.id} hafasClient={hafasClient} stationId={station.id} stationName={station.name} />)}</ul>
      </main>
    </Suspense>
  );
}
