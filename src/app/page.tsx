import { LocationButton } from "./components/LocationButton";

export default function Home() {
  return (
    <main>
      <h1 className=" italic text-center pb-2">RMV Abfahrten</h1>
      <div className="text-center">
        <LocationButton />
      </div>
    </main>
  );
}
