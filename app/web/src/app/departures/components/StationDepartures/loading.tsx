import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import { DepartureSkeleton } from "../Departure/loading";

export function StationDeparturesSkeleton() {
  return (
    <div className="">
      <h3 className="text-lg font-semibold p-2   bg-slate-300 dark:bg-slate-900 border-y ">
        <Skeleton height={"1.75rem"} />
      </h3>
      <DepartureSkeleton />
      <DepartureSkeleton />
      <DepartureSkeleton />
      <DepartureSkeleton />
      <DepartureSkeleton />
    </div>
  );
}
