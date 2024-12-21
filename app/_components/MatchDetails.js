"use client";

import { useMatchContext } from "../_context/MatchContext";

function MatchDetails() {
  const { teams, totalOvers, battingFirstTeam } = useMatchContext();
  return (
    <div>
      <p>
        Match -{teams.team1} vs {teams.team2}
      </p>
      <p>Total Over / innings - {totalOvers} overs</p>
      <p>Bat first: {battingFirstTeam}</p>
    </div>
  );
}

export default MatchDetails;
