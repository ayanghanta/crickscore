"use client";

import { useInnings } from "../_context/InningsContext";
import CurrentBatterBowler from "./CurrentBatterBowler";
import InningEnd from "./InningEnd";
import InningsCard from "./InningsCard";
import OverActions from "./OverActions";
import ShortSummary from "./ShortSummary";
import TeamScore from "./TeamScore";

function ScoreCard() {
  const { matchEnd } = useInnings();
  return (
    <div>
      <InningEnd />
      <TeamScore />

      {!matchEnd && (
        <>
          <CurrentBatterBowler />
          <ShortSummary />
          <OverActions />
        </>
      )}
      <InningsCard />
    </div>
  );
}

export default ScoreCard;
