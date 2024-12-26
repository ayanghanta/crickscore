"use client";

import { useState } from "react";
import { useMatchContext } from "../_context/MatchContext";
import { IoAlertCircleOutline } from "react-icons/io5";

function MatchDetails() {
  const { teams, totalOvers, battingFirstTeam } = useMatchContext();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative">
      <IoAlertCircleOutline
        className="text-xl text-gray-500 cursor-pointer hover:text-gray-700"
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      />

      {showDetails && (
        <div
          className="absolute left-8 top-0 bg-gray-50 shadow-lg rounded-md border border-gray-200 p-4 w-64 transition-all duration-300"
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        >
          <div className="text-gray-700 text-sm space-y-2">
            <p className="text-base font-medium">
              Match:{" "}
              <span className="text-indigo-600 font-bold">{teams.team1}</span>{" "}
              vs{" "}
              <span className="text-indigo-600 font-bold">{teams.team2}</span>
            </p>

            <p>
              <span className="font-semibold">Total Overs:</span>{" "}
              <span>{totalOvers} overs</span>
            </p>

            <p>
              <span className="font-semibold">Batting First:</span>{" "}
              <span>{battingFirstTeam}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchDetails;
