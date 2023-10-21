"use client";
import { ReactNode } from "react";

export const Button = ({ disabled, onClick, children }: { disabled: boolean; onClick?: () => void; children: ReactNode }) => {
  return (
    <button onClick={onClick} className={`${!disabled ? "bg-blue-500 hover:bg-blue-700  text-white" : "bg-gray-500"} text-gray-50 font-bold py-2 px-4 rounded`}>
      {children}{" "}
    </button>
  );
};
