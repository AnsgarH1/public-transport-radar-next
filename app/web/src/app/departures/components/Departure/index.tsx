"use client";
import { Alternative } from "hafas-client";
import { getDepartureTimes } from "./getDeparturesTimes";
import { useReducer } from "react";

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
  const [showRemarks, toggleRemarks] = useReducer((curr) => !curr, false);
  const { line, platform, destination, cancelled, when, plannedWhen, remarks } = departure;

  if (when && plannedWhen && line) {
    const { delay, displayDepartureTime } = getDepartureTimes(new Date(when), new Date(plannedWhen));
    return (
      <div className=" bg-slate-100 dark:bg-slate-900 odd:dark:bg-slate-800 odd:bg-slate-200 last:border-none py-1">
        <div className="flex justify-between items-center  ">
          <div className="mx-2">
            {platform && <span className="text-xs italic">Steig/Gleis {platform}</span>}
            <p className={cancelled ? "line-through line-clamp-1" : "line-clamp-1"}>
              {line?.name} <span className="text-xs text-ellipsis  overflow-hidden ">{destination?.name} </span>
            </p>
          </div>
          <span className="mx-2  min-w-fit ">
            {delay !== "0" && <p className="text-xs text-end ">{delay} Min. verspätet</p>}
            <p className="text-end font-bold ">{displayDepartureTime}</p>
          </span>
        </div>
        {!!remarks?.length &&
          (showRemarks ? (
            <RemarksInfo
              remarks={remarks.map((remark) => ({
                text: remark.text,
                summary: remark.summary,
              }))}
              hide={toggleRemarks}
            />
          ) : (
            <button className="border border-gray-800 dark:border-gray-500 text-xs p-0.5 ml-2 mb-1 rounded" onClick={toggleRemarks}>
              Infos
            </button>
          ))}
      </div>
    );
  } else {
    return <div className="flex justify-between items-centermax-w-xl border-b border-dotted last:border:none  ">-- keine Daten --</div>;
  }
};
