import { Suspense } from "react";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { Client as GMapsClient, LatLng } from "@googlemaps/google-maps-services-js";

import { Station } from "./components/Station";
import { createClient, Location as HafasLocation } from "hafas-client";
import { profile as rmvProfile } from "hafas-client/p/rmv";

async function getAdressFromCoords(latlng: LatLng) {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  console.log("google maps trying to load", googleMapsApiKey);
  if (googleMapsApiKey) {
    try {
      const gmapsClient = new GMapsClient({});
      const result = await gmapsClient.reverseGeocode({
        params: {
          key: googleMapsApiKey,
          latlng,
        },
      });

      const adress = result.data.results[1].formatted_address;
      return adress;
    } catch (error) {
      console.error("GMaps Error" + error);
    }
  }
}

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

  const adress = await getAdressFromCoords({ latitude, longitude });

  const hafasClient = createClient(rmvProfile, "ansg.hoy+hafasClientApp@gmail.com");

  const hafasLocation: HafasLocation = {
    latitude,
    longitude,
    type: "location",
  };

  const stations = await hafasClient.nearby(hafasLocation, { distance });

  return (
    <Suspense fallback={<p>loading...</p>}>
      <main className="h-screen overflow-y-auto">
        <div className="bg-slate-200">
          <p className="text-xs text-center p-2">Ergebnisse für {adress}</p>
        </div>
        <ul>{stations.map((station) => station.id && station.name && <Station key={station.id} hafasClient={hafasClient} stationId={station.id} stationName={station.name} />)}</ul>
      </main>
    </Suspense>
  );
}
