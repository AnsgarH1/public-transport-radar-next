"use client";

import { useEffect, useMemo, useRef, useState, CSSProperties } from "react";
import "./styles.css";

const ScrollRemark = ({ remarks }: { remarks: { text?: string; summary?: string }[] }) => {
  const textLength = useMemo(() => remarks.reduce((textLength, { summary, text }) => textLength + (summary?.length ?? 0) + (text?.length ?? 0), 0), [remarks]);

  const scrollableItemRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState("5px");

  const SPEED_FACTOR = textLength / 10;

  useEffect(() => {
    if (scrollableItemRef.current) {
      setItemWidth(scrollableItemRef.current.clientWidth.toString() + "px");
      console.log("setting width to", scrollableItemRef.current.clientWidth);
    }
  }, [scrollableItemRef]);

  return (
    <div className="scroll-container ">
      <div className="scroll-items" style={{ "--scroll-speed": SPEED_FACTOR + "s", "--translationWidth": itemWidth } as CSSProperties}>
        <div className="scroll-text text-xs italic ">
          {remarks.map(({ summary, text }, index) => (
            <>
              {summary && <span className="font-semibold">{summary}: </span>}
              {text && <span className="font-mono">{text}</span>}
              {" --- "}
            </>
          ))}
        </div>
        <div className="scroll-text text-xs italic" ref={scrollableItemRef}>
          &nbsp;
          {remarks.map(({ summary, text }, index) => (
            <>
              {summary && <span className="font-semibold">{summary}: </span>}
              {text && <span className="font-mono">{text}</span>}
              {" --- "}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollRemark;

/**
 * <div className="scroll-text text-xs italic ">
          Start&nbsp;
          {remarks.map(({ summary, text }, index) => (
            <>
              {summary && <span className="font-semibold">{summary}: </span>}
              {text && <span className="font-mono">{text}</span>}
              {" --- "}
            </>
          ))}
        </div>
        <div className="scroll-text text-xs italic" style={scrollSpeed}>
          Mitte&nbsp;
          {remarks.map(({ summary, text }, index) => (
            <>
              {summary && <span className="font-semibold">{summary}: </span>}
              {text && <span className="font-mono">{text}</span>}
              {" --- "}
            </>
          ))}
        </div>
 */
