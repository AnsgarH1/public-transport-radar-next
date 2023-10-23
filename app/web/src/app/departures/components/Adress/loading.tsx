import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function AdressSkeleton() {
  return (
    <div className="bg-slate-200 dark:bg-slate-900 text-center">
      <p>
        <Skeleton height={"0.75rem"} width={"10rem"} />
      </p>
    </div>
  );
}
