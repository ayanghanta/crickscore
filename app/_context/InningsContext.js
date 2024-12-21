"use client";

import { createContext, useContext, useReducer } from "react";
import { calcLegalDelivary, rotateStrike, Bowl } from "../_lib/ulits";

const InningsContext = createContext();

/*
const state = {
  allOvers: [
    [{
      bowler: "arjun",
      batter: "gukesh",
      isvalid: true,
      run: 1,
    },
    {
      bowler: "arjun",
      batter: "gukesh",
      isvalid: false,
      run: 1,
      type: "wd", // wd, no,...
    },
    {
      bowler: "arjun",
      batter: "gukesh",
      isvalid: true,
      run: 0,
      wicket: 1,
      outbatter: "arjun",
      isWicketTobolwer: true,
    }]
  ],
};
*/
const initialState = {
  allOvers: [[]],
  currentOver: [],
  currentBatters: [{}, {}],
  // onStrike: 1,
  // currentBatters: [
  //   { name: "Subhman Gill", id: "a1" },
  //   { name: "Virat Kohli", id: "a2" },
  // ],
  onStrike: 1,
  allPlayers: [],
  isNewOver: false,
  totalWicketFall: 0,
  isInningsEnd: false,
  totalOver: 5,
  over: 0,
  isFreeHit: false,
  isGameOn: false,
};

function updateAllOversData(state, bowl) {
  let updatedOver;
  if (state.isNewOver) updatedOver = [];
  if (!state.isNewOver) updatedOver = [...state.currentOver];
  updatedOver.push(bowl);

  const updatedAllOvers = [...state.allOvers];
  if (state.isNewOver) updatedAllOvers.push(updatedOver);
  if (!state.isNewOver)
    updatedAllOvers[updatedAllOvers.length - 1] = updatedOver;

  const legalBallBowl = calcLegalDelivary(updatedOver);
  const isOverEnd = legalBallBowl >= 6;
  const updateOver =
    legalBallBowl >= 6
      ? updatedAllOvers.length
      : +`${updatedAllOvers.length - 1}.${legalBallBowl}`;

  // SET IS the NEXT BALL FREEHIT OR NOT

  const lastDelivery = updatedOver.at(-1);
  const isNextBallFreeHit = lastDelivery.type === "NO" && lastDelivery.freeHit;

  // CHANGE STRIKE

  const onStrike = rotateStrike(
    lastDelivery,
    state.currentBatters,
    state.onStrike,
    isOverEnd
  );

  // IS INNINGS END
  // 1. in 10 wicket fall
  // if(state)

  return {
    ...state,
    currentOver: updatedOver,

    allOvers: updatedAllOvers,
    isNewOver: isOverEnd,
    over: updateOver,
    isInningsEnd: updateOver >= state.totalOver,
    isFreeHit: isNextBallFreeHit,
    onStrike,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "extrasRun":
      return { ...state };

    case "scoreRun":
      const { bowler, batter, run: scoreRun } = action.payload;
      const bowl = new Bowl(bowler, batter).score(scoreRun);
      batter.scoreRun(scoreRun);
      const updatedData = updateAllOversData(state, bowl);

      return {
        ...updatedData,
      };

    case "bowlWideBall":
      const wideBall = new Bowl("arjun", "rampal").wideBall(action.payload);
      const updatedDataAfterWide = updateAllOversData(state, wideBall);
      return { ...updatedDataAfterWide };

    case "bowlNoBall":
      const noBall = new Bowl("arjun", "rampal").noBall(action.payload);
      const updatedDataAfterNo = updateAllOversData(state, noBall);

      return { ...updatedDataAfterNo };

    case "wicketFall":
      const { wicketType, outBatter, run } = action.payload;
      const wicketBowl = new Bowl("Arjun", "rampal").wicketFall(
        run,
        outBatter,
        wicketType
      );
      const updatedDataW = updateAllOversData(state, wicketBowl);

      // delete the batter form the current batter
      const currentBatters = state.currentBatters.map((batter) =>
        batter.id === outBatter.id ? {} : batter
      );

      // allPlayers
      // if batter on strike the rest this filed
      const onStrikeBatter = state.onStrike === outBatter ? "" : state.onStrike;

      return {
        ...updatedDataW,
        totalWicketFall: state.totalWicketFall + 1,
        isInningsEnd: state.totalWicketFall + 1 === 10,
        currentBatters,
        onStrike: onStrikeBatter,
        isGameOn: false,
      };

    case "setBatters":
      const newCurrentBatters = action.payload;

      // UPDATE LISTED PLAYERS
      const updatePlyerList = [...state.allPlayers];
      const alreadyListedPlayers = state.allPlayers.map((batter) => batter.id);

      newCurrentBatters.forEach((batter) => {
        if (!alreadyListedPlayers.includes(batter.id)) {
          updatePlyerList.push(batter);
        }
      });
      console.log(updatePlyerList);
      return {
        ...state,
        currentBatters: newCurrentBatters,
        isGameOn: true,
        allPlayers: updatePlyerList,
      };

    case "setStriker":
      return { ...state, onStrike: action.payload };

    default:
      throw new Error("Action unknown");
  }
}

function InningsProvider({ children }) {
  const [allStates, dispatch] = useReducer(reducer, initialState);

  const currentOverActivity = allStates.currentOver.map((bowl) => {
    return { run: bowl.run, type: bowl.type };
  });

  const totalScore = allStates.allOvers
    .flat()
    .map((bowl) => (bowl.run ? bowl.run : 0))
    .reduce((cur, acc) => acc + cur, 0);

  console.log(allStates);

  return (
    <InningsContext.Provider
      value={{
        ...allStates,
        dispatch,
        currentOverActivity,
        totalScore,
      }}
    >
      {children}
    </InningsContext.Provider>
  );
}
function useInnings() {
  const context = useContext(InningsContext);
  if (context === undefined)
    throw new Error("use over context inside the over context Provider");
  return context;
}

export { InningsProvider, useInnings };
