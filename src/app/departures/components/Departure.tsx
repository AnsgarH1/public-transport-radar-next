"use client";
import { Alternative } from "hafas-client";
import { getDepartureTimes } from "./getDeparturesTimes";
import { useReducer } from "react";

const RemarksInfo = ({ remarks, hide }: { remarks: (string | undefined)[]; hide: () => void }) => {
  return (
    <div className="text-xs ml-2 mb-1 italic">
      <button className=" border rounded m-1 px-3 " onClick={hide}>
        X
      </button>
      {remarks.map((info) => (
        <p key="info" className="text-xs">
          {info}
        </p>
      ))}
    </div>
  );
};

export const Departure = ({ departure }: { departure: Alternative }) => {
  const [showRemarks, toggleRemarks] = useReducer((curr) => !curr, false);
  const { line, platform, destination, cancelled, when, plannedWhen, remarks, direction, tripId } = departure;

  if (when && plannedWhen && line) {
    const { delay, displayDepartureTime } = getDepartureTimes(new Date(when), new Date(plannedWhen));
    return (
      <div className=" border-b border-dotted last:border:none py-1">
        <div className="flex justify-between items-center  ">
          <span className="mx-2">
            {platform && <span className="text-xs italic">Steig/Gleis {platform}</span>}
            <p className={cancelled ? "line-through " : ""}>
              {line?.name} <span className="text-xs text-ellipsis ">{destination?.name} </span>
            </p>
          </span>
          <span className="mx-2">
            <p className="text-xs text-end">{delay} Min. verspätet</p>
            <p className="text-end ">{displayDepartureTime}</p>
          </span>
        </div>
        {!!remarks?.length &&
          (showRemarks ? (
            <RemarksInfo remarks={remarks.map((remark) => remark.text)} hide={toggleRemarks} />
          ) : (
            <button className="border text-xs p-0.5 ml-2 mb-1 rounded" onClick={toggleRemarks}>
              Infos
            </button>
          ))}
      </div>
    );
  } else {
    return <div className="flex justify-between items-centermax-w-xl border-b border-dotted last:border:none  ">-- keine Daten --</div>;
  }
};
