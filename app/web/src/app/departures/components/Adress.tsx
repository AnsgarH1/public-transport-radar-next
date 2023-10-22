import { Client as GMapsClient, LatLng } from "@googlemaps/google-maps-services-js";
import { Suspense } from "react";

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

export const Adress = async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const adress = await getAdressFromCoords({ latitude, longitude });

  return (
    <Suspense>
      <div className="bg-slate-200">{adress && <p className="text-xs text-center p-2">Ergebnisse für {adress}</p>}</div>
    </Suspense>
  );
};
