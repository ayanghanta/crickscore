"use client";

import { useInnings } from "@/app/_context/InningsContext";
import { useMatchContext } from "@/app/_context/MatchContext";
import { useScoreBoard } from "@/app/_context/ScoreBoardContext";

export function useStart2ndInnings() {
  const {
    allOvers,
    allBowlers,
    allBatters,
    totalWicketFall,
    totalOver,
    over,
    targetToWin,
    dispatch: inningsDispatch,
  } = useInnings();
  const { dispatch, currentlyBattingTeam } = useScoreBoard();
  const { teams } = useMatchContext();

  // SEAVE THE FIRST INNING DATA
  function start2ndinnings() {
    console.log("hello");
    dispatch({
      type: "saveFirstInningsData",
      payload: {
        allOvers,
        allBowlers,
        allBatters,
        totalWicketFall,
        over,
        targetToWin,
      },
    });

    // SET THE CURRNET INNINGS:2
    dispatch({ type: "setCurrentInnings", payload: 2 });

    // SET THE CURRNET BATTING TEAM
    const newBattingTeam =
      teams.team1 === currentlyBattingTeam ? teams.team2 : teams.team1;
    dispatch({ type: "setCurrentBattingTeam", payload: newBattingTeam });

    // RESET THE ININGS CONTEXT AND CALUACTE AND SAVE THE TARGATE

    inningsDispatch({ type: "1stInningsReset" });
  }

  return { start2ndinnings };
}
