import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const LoadingPage: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.settings);

  const containerClasses =
    theme === "dark"
      ? "bg-gray-900 text-gray-100"
      : "bg-gray-100 text-black";

  return (
    <div className={`loading-container ${containerClasses}`}>
      <div className="loading-spinner"></div>
    </div>
  );
};