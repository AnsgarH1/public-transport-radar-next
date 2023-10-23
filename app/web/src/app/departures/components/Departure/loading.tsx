import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function DepartureSkeleton() {
  return (
    <div className=" bg-slate-100 dark:bg-slate-900 odd:dark:bg-slate-800 odd:bg-slate-200 last:border-none py-1">
      <div className="flex justify-between items-center  ">
        <span className="mx-2">
          <Skeleton width="4rem" />
          <p>
            <span className="text-xs text-ellipsis ">
              <Skeleton />
            </span>
          </p>
        </span>
        <span className="mx-2">
          <p className="text-xs text-end">
            <Skeleton />
          </p>
          <p className="text-end ">
            <Skeleton />
          </p>
        </span>
      </div>
    </div>
  );
}
