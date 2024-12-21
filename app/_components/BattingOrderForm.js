"use client";

import { useState } from "react";
import { useMatchContext } from "../_context/MatchContext";
import { useRouter } from "next/navigation";

function BattingOrderForm() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { dispatch, teams } = useMatchContext();
  const router = useRouter();

  const palyingTeams = Object.keys(teams).map((filed) => teams[filed]);
  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedTeam) return;

    dispatch({ type: "setBattingOrder", payload: selectedTeam });

    router.push("/scoreboard");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {palyingTeams.map((team, index) => (
          <label key={index}>
            <input
              type="radio"
              value={team}
              checked={selectedTeam === team}
              onChange={() => setSelectedTeam(team)}
            />
            {team}
          </label>
        ))}
        {setSelectedTeam && <button>Next</button>}
      </form>
    </div>
  );
}

export default BattingOrderForm;
