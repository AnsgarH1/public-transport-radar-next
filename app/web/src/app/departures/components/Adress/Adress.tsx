import { Client as GMapsClient, LatLng } from "@googlemaps/google-maps-services-js";

async function getAdressFromCoords(latlng: LatLng) {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
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
  return <div className="bg-slate-200 dark:bg-slate-900">{adress && <p className="text-xs text-center p-2">Ergebnisse für {adress}</p>}</div>;
};
