// https://maps.googleapis.com/maps/api/geocode/json?latlng=28.640964,77.235875&key=YOUR_API_KEY&enable_address_descriptor=true

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { z } from "zod";
import { fromZodError } from "zod-validation-error";

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
      return result;
    } catch (error) {
      console.error("GMaps Error" + error);
    }
  } else {
    console.error("no google Maps Api Key found!");
  }
}

export async function GET(request: NextRequest) {
  const urlParams = request.nextUrl.searchParams;
  const coordinateSchema = z.object({
    latitude: z.string().transform((input) => Number.parseFloat(input)),
    longitude: z.string().transform((input) => Number.parseFloat(input)),
  });

  const parsedInput = coordinateSchema.safeParse({ longitude: urlParams.get("longitude"), latitude: urlParams.get("latitude") });

  if (!parsedInput.success) {
    const errorMessage = fromZodError(parsedInput.error);
    console.warn("Input Error", errorMessage.message);
    return NextResponse.json(
      {
        message: errorMessage.message,
      },
      {
        status: 400,
      }
    );
  } else {
    const { latitude, longitude } = parsedInput.data;

    try {
      const adress = await getAdressFromCoords({ latitude, longitude });
      if (adress?.status !== 200) {
        console.error("GMaps Reverse GeoCode Error", adress?.statusText, adress?.status, adress?.headers);
        return NextResponse.json("internal server error", { status: 500 });
      }
      const adresses = adress?.data.results.map((result) => result.formatted_address);
      return NextResponse.json(
        { adresses },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Unexpected Error:", error);
      return NextResponse.json(error, { status: 500 });
    }
  }
}
