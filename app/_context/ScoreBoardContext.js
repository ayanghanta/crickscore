"use client";

import { createContext, useContext, useReducer } from "react";
import { caclTotalRun } from "../_lib/ulits";

const ScoreBoardContext = createContext();

const initalState = {
  firstInningsData: {},
  secondInningsData: {},
  currentInnings: 1,
  currentlyBattingTeam: "RCB",
  firstInningTotal: 0,
  secondInningsTotal: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "saveFirstInningsData":
      const firstInningTotal = caclTotalRun(action.payload.allOvers);
      const teamName = state.currentlyBattingTeam;
      return {
        ...state,
        firstInningsData: action.payload,
        firstInningTotal,
        teamName,
      };
    case "setCurrentBattingTeam":
      return { ...state, currentlyBattingTeam: action.payload };
    case "setCurrentInnings":
      return { ...state, currentInnings: action.payload };

    default:
      throw new Error("Action unknown");
  }
}

function ScoreBoardProvider({ children }) {
  const [bothInningsData, dispatch] = useReducer(reducer, initalState);

  return (
    <ScoreBoardContext.Provider value={{ ...bothInningsData, dispatch }}>
      {children}
    </ScoreBoardContext.Provider>
  );
}
function useScoreBoard() {
  const context = useContext(ScoreBoardContext);
  if (context === undefined)
    throw new Error(
      "use score board context inside the scoreboardCotext Provider"
    );
  return context;
}

export { ScoreBoardProvider, useScoreBoard };
