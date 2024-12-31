"use client";
import { createContext, useContext, useReducer, useRef } from "react";

const MatchContext = createContext();

const initalState = {
  teams: {
    // team1: "RCB",
    // team2: "KKR",
    team1: "",
    team2: "",
  },
  // totalOvers: "5",
  totalOvers: "",
  battingFirstTeam: "",
  // battingFirstTeam: "RCB",
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
  const scoreboardRef = useRef(null);
  const inningsCardRef = useRef(null);

  return (
    <MatchContext.Provider
      value={{
        teams,
        totalOvers,
        battingFirstTeam,
        scoreboardRef,
        inningsCardRef,
        dispatch,
      }}
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
