// https://maps.googleapis.com/maps/api/geocode/json?latlng=28.640964,77.235875&key=YOUR_API_KEY&enable_address_descriptor=true

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { z } from "zod";
import { fromZodError } from "zod-validation-error";

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
    console.info("Parsed URL Params: lat", latitude, "lon" + longitude);
    try {
      const googleMapsUri = process.env.GOOGLE_MAPS_GEOCODE_API;
      const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

      if (!googleMapsApiKey || !googleMapsUri) {
        console.error("Google Maps environment variables not set!!");
        return NextResponse.json("internal server error", { status: 500 });
      }
      const url = new URL(googleMapsUri);
      url.searchParams.append("latlng", latitude + "," + longitude);
      url.searchParams.append("key", googleMapsApiKey);
      const result = await fetch(url);
      const data = result.json();

      return NextResponse.json(
        { data },
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
