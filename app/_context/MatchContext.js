"use client";
import { createContext, useContext, useReducer } from "react";

const MatchContext = createContext();

const initalState = {
  teams: {
    team1: "RCB",
    team2: "KKR",
  },
  totalOvers: "5",
  battingFirstTeam: "RCB",
  mathWon: "",
  innings: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "addTeams":
      const { team1, team2 } = action.payload;
      return {
        ...state,
        teams: { team1, team2 },
      };
    case "setOver":
      return { ...state, totalOvers: action.payload };
    case "setBattingOrder":
      return { ...state, battingFirstTeam: action.payload };
    case "matchResult":
      return { ...state, mathWon: action.payload };
    default:
      throw new Error("Action unknown");
  }
}

function MatchProvider({ children }) {
  const [{ teams, totalOvers, battingFirstTeam }, dispatch] = useReducer(
    reducer,
    initalState
  );
  return (
    <MatchContext.Provider
      value={{ teams, totalOvers, battingFirstTeam, dispatch }}
    >
      {children}
    </MatchContext.Provider>
  );
}

function useMatchContext() {
  const context = useContext(MatchContext);
  if (context === undefined)
    throw new Error("use match context inside the mathcContext Provider");
  return context;
}

export { MatchProvider, useMatchContext };
