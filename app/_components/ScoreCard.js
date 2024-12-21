"use client";

import CurrentBattings from "./CurrentBattings";
import CurrentBowlar from "./CurrentBowlar";
import OverActions from "./OverActions";
import ShortSummary from "./ShortSummary";
import TeamScore from "./TeamScore";

function ScoreCard() {
  return (
    <div>
      <TeamScore />
      <CurrentBattings />
      <CurrentBowlar />
      <OverActions />
      <ShortSummary />
    </div>
  );
}

export default ScoreCard;
