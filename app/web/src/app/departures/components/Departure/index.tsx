"use client";
import { Alternative } from "hafas-client";
import { getDepartureTimes } from "./getDeparturesTimes";
import ScrollRemark from "@/app/components/ScrollRemark";

const RemarksInfo = ({ remarks, hide }: { remarks: { text?: string; summary?: string }[]; hide: () => void }) => {
  return (
    <div className="text-xs ml-2 mr-2 mb-1 italic  ">
      <button className=" border border-gray-800 text-xs w-8 mb-1 rounded" onClick={hide}>
        X
      </button>
      {remarks.map(({ text, summary }) => (
        <div key="info" className="text-xs w-auto p-2 border-b border-slate-500 border-dotted last:border-none">
          {summary}
          {text}
        </div>
      ))}
    </div>
  );
};

export const Departure = ({ departure }: { departure: Alternative }) => {
  const { line, platform, destination, cancelled, when, plannedWhen, remarks } = departure;

  if (when && plannedWhen && line) {
    const { delay, displayDepartureTime } = getDepartureTimes(new Date(when), new Date(plannedWhen));
    return (
      <div className=" bg-slate-100 dark:bg-slate-900 odd:dark:bg-slate-800 odd:bg-slate-200 p-2">
        <div className="flex justify-between items-end  ">
          <div className="flex-1 overflow-hidden  ">
            {remarks && <ScrollRemark remarks={remarks.map((remark) => ({ text: remark.text, summary: remark.summary }))} />}
            {platform && <span className="text-xs italic">Steig/Gleis {platform}</span>}
            <p className={cancelled ? "line-through line-clamp-1" : "line-clamp-1"}>
              <span className="font-semibold"> {line?.name} </span>
              <span className="text-ellipsis  overflow-hidden ">{destination?.name} </span>
            </p>
          </div>
          <div className=" min-w-max ">
            {delay !== "0" && <p className="text-xs text-end ">{delay} Min. verspätet</p>}
            <p className="text-end font-semibold ">{displayDepartureTime}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="flex justify-between items-centermax-w-xl border-b border-dotted last:border:none  ">-- keine Daten --</div>;
  }
};
