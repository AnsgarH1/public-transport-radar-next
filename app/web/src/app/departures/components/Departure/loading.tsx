import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function DepartureSkeleton() {
  return (
    <div className=" bg-slate-100 dark:bg-slate-900 odd:dark:bg-slate-800 odd:bg-slate-200 last:border-none">
      <div className="flex justify-between items-center">
        <div className="mx-2">
          <div className="flex align-bottom">
            <div className="pr-2">
              <Skeleton width={"4rem"} height="1rem" />
            </div>
            <Skeleton width="10rem" height="0.75rem" />
          </div>
        </div>
        <div className="text-end mr-2">
          <Skeleton width={"8rem"} height="0.75rem" />
          <Skeleton width={"4rem"} height="1rem" />
        </div>
      </div>
      <div className=" ml-2 mr-2 mb-1">
        <Skeleton width={"2.2rem"} height="1.25rem" />
      </div>
    </div>
  );
}
