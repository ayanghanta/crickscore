"use client";

import { useInnings } from "../_context/InningsContext";
import CurrentBatterBowler from "./CurrentBatterBowler";
import InningEnd from "./InningEnd";
import InningsCard from "./InningsCard";
import OverActions from "./OverActions";
import ShortSummary from "./ShortSummary";
import TeamScore from "./TeamScore";
import TeamWin from "./TeamWin";

function ScoreCard() {
  const { matchEnd } = useInnings();
  return (
    <div>
      <InningEnd />
      <TeamScore />
      <TeamWin />
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
