"use client";

import CurrentBatterBowler from "./CurrentBatterBowler";
import InningEnd from "./InningEnd";
import InningsCard from "./InningsCard";
import OverActions from "./OverActions";
import ShortSummary from "./ShortSummary";
import TeamScore from "./TeamScore";

function ScoreCard() {
  return (
    <div>
      <InningEnd />
      <TeamScore />
      <CurrentBatterBowler />

      <ShortSummary />
      <OverActions />
      <InningsCard />
    </div>
  );
}

export default ScoreCard;
