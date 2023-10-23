import { DateTime } from "luxon";

const getDepartureTimes = (when: Date | null, plannedWhen: Date) => {
  const usedDepartureTime = when ? new Date(when) : new Date(plannedWhen);

  function getDelay(planned: Date, actual: Date | null) {
    if (actual === null || actual == planned) {
      return undefined;
    }
    const plannedDate = DateTime.fromJSDate(new Date(planned));
    const actualDate = DateTime.fromJSDate(new Date(actual));
    const diff = actualDate.diff(plannedDate);
    return diff.toFormat("m");
  }

  function getDisplayTime(time: Date): string {
    const dt = DateTime.fromJSDate(time);
    const delta = dt.diffNow("minutes").minutes;
    const roundedDelta = Math.abs(Math.round(delta));

    if (delta >= 1 && delta < 15) {
      return `in ${roundedDelta} Min.`;
    } else if (delta < 1 && delta >= 0) {
      return `< 1 Minute`;
    } else {
      return `${dt.toLocaleString(DateTime.TIME_24_SIMPLE)}`;
    }
  }

  function get24HourFormat(time: Date): string {
    const dt = DateTime.fromJSDate(time);
    return `${dt.toLocaleString(DateTime.TIME_24_SIMPLE)}`;
  }

  return {
    displayDepartureTime: getDisplayTime(usedDepartureTime),
    delayed: when ? when !== plannedWhen : undefined,
    display24HourFormat: get24HourFormat(usedDepartureTime),
    delay: getDelay(plannedWhen, when),
  };
};

export { getDepartureTimes };
