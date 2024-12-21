"use client";

import { createContext, useContext } from "react";

const ScoreBoardContext = createContext();

function ScoreBoardProvider({ children }) {
  return (
    <ScoreBoardContext.Provider value={{}}>
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
