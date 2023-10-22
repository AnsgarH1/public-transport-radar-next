import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import { createClient, Location as HafasLocation } from "hafas-client";
import { profile as rmvProfile } from "hafas-client/p/rmv";

export async function GET(request: NextRequest) {
  const urlParams = request.nextUrl.searchParams;
  const coordinateSchema = z.object({
    latitude: z.string().transform((input) => Number.parseFloat(input)),
    longitude: z.string().transform((input) => Number.parseFloat(input)),
    distance: z
      .string()
      .default("400")
      .transform((input) => Number.parseFloat(input)),
  });

  const parsedInput = coordinateSchema.safeParse({ longitude: urlParams.get("longitude"), latitude: urlParams.get("latitude"), distance: urlParams.get("distance") ?? undefined });

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
    const { latitude, longitude, distance } = parsedInput.data;
    console.info("Parsed URL Params: lat", latitude, "lon" + longitude, "dist" + distance);
    try {
      const hafasClient = createClient(rmvProfile, "ansg.hoy+hafasClientApp@gmail.com");
      console.info("Hafas Client created");
      const hafasLocation: HafasLocation = {
        latitude,
        longitude,
        type: "location",
      };

      const stations = await hafasClient.nearby(hafasLocation, { distance });
      console.info("found Stations:" + stations.length);
      return NextResponse.json(stations, {
        status: 200,
      });
    } catch (error) {
      console.error("Unexpected Error:", error);
      return NextResponse.json(error, { status: 500 });
    }
  }
}
