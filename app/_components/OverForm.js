"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMatchContext } from "../_context/MatchContext";
import Button from "./Button";
import { useInnings } from "../_context/InningsContext";

function OverForm() {
  const { dispatch, teams, totalOvers } = useMatchContext();
  const [over, setOver] = useState(totalOvers || 0);
  const router = useRouter();
  const { dispatch: inningsDispatch } = useInnings();

  function handleSubmit(e) {
    e.preventDefault();
    if (!over || over < 1) return; // Ensure the over value is greater than 0

    dispatch({ type: "setOver", payload: over });

    inningsDispatch({ type: "setTotalOver", payload: over });

    router.push("/batting");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Enter Number of Overs
        </h1>

        {/* Match Info */}
        <div className="text-center text-lg font-medium text-gray-600 mb-6">
          <span className="font-bold text-lg text-indigo-600">
            {teams.team1}
          </span>{" "}
          vs
          <span className="font-bold text-lg text-indigo-600">
            {" "}
            {teams.team2}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="over"
              className="block text-lg font-medium text-gray-700"
            >
              Total Overs
            </label>
            <input
              type="number"
              min={1}
              id="over"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              value={over}
              onChange={(e) => setOver(+e.target.value)}
              placeholder="Enter number of overs"
            />
          </div>

          {over >= 1 && (
            <Button
              type="next"
              role="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
            >
              Next
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default OverForm;
