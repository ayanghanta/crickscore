"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMatchContext } from "../_context/MatchContext";

function TeamsForm() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const router = useRouter();
  const { dispatch } = useMatchContext();

  function handleSubmit(e) {
    e.preventDefault();
    if (!team1 || !team2) return;

    dispatch({ type: "addTeams", payload: { team1, team2 } });

    router.push("/overs");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="team1">Team: 1</label>
          <input
            type="text"
            name="team1"
            id="team1"
            className="text-gray-700"
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="team2">Team: 2</label>
          <input
            type="text"
            name="team2"
            id="team2"
            className="text-gray-700"
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
          />
        </div>
        {team1 && team2 && <button>Next</button>}
      </form>
    </div>
  );
}

export default TeamsForm;
