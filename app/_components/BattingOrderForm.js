"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMatchContext } from "../_context/MatchContext";
import { useScoreBoard } from "../_context/ScoreBoardContext";
import Button from "./Button";

function BattingOrderForm() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { dispatch, teams, totalOvers } = useMatchContext();
  const { dispatch: scoreBoardDispatch } = useScoreBoard();

  const router = useRouter();

  const playingTeams = Object.keys(teams).map((field) => teams[field]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedTeam) return;

    dispatch({ type: "setBattingOrder", payload: selectedTeam });
    scoreBoardDispatch({
      type: "setCurrentBattingTeam",
      payload: selectedTeam,
    });

    router.push("/scoreboard");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Who is Batting First?
        </h1>

        <div className="text-center text-lg font-medium text-gray-600 mb-4">
          <span className="font-bold  text-indigo-600">{teams.team1}</span>
          <span className="mx-2 text-2xl text-gray-600">vs</span>
          <span className="font-bold  text-indigo-600">{teams.team2}</span>
        </div>
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700">
            <span className="font-semibold text-indigo-600">Total Overs:</span>{" "}
            {totalOvers}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-4 items-center">
            {playingTeams.map((team, index) => (
              <label
                key={index}
                className="flex items-center text-gray-800 font-medium"
              >
                <input
                  type="radio"
                  value={team}
                  checked={selectedTeam === team}
                  onChange={() => setSelectedTeam(team)}
                  className="mr-3 w-5 h-5 accent-indigo-600 border-2 border-indigo-600 rounded-full transition-all hover:ring-2 hover:ring-indigo-300 focus:outline-none"
                />
                <span className="text-xl">{team}</span>
              </label>
            ))}
          </div>

          {selectedTeam && (
            <Button
              type="next"
              role="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
            >
              Start Match
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default BattingOrderForm;
