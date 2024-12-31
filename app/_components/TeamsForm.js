"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMatchContext } from "../_context/MatchContext";
import Button from "./Button";

function TeamsForm() {
  const { dispatch, teams } = useMatchContext();
  const [team1, setTeam1] = useState(teams.team1 || "");
  const [team2, setTeam2] = useState(teams.team2 || "");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (!team1 || !team2) return;

    dispatch({ type: "addTeams", payload: { team1, team2 } });

    router.push("/overs");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Enter Teams for the Match
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="team1"
              className="block text-lg font-medium text-gray-700"
            >
              Team 1
            </label>
            <input
              type="text"
              id="team1"
              name="team1"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              placeholder="Enter Team 1 Name"
            />
          </div>

          <div>
            <label
              htmlFor="team2"
              className="block text-lg font-medium text-gray-700"
            >
              Team 2
            </label>
            <input
              type="text"
              id="team2"
              name="team2"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              placeholder="Enter Team 2 Name"
            />
          </div>

          {team1 && team2 && (
            <Button type="next" role="submit">
              Next
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default TeamsForm;
