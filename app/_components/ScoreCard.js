"use client";

import CurrentBatterBowler from "./CurrentBatterBowler";
import InningsCard from "./InningsCard";
import OverActions from "./OverActions";
import ShortSummary from "./ShortSummary";
import TeamScore from "./TeamScore";

function ScoreCard() {
  return (
    <div>
      <TeamScore />
      <CurrentBatterBowler />

      <OverActions />
      <ShortSummary />
      <InningsCard />
    </div>
  );
}

export default ScoreCard;
