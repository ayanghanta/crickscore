"use client";

import { createContext, useContext, useReducer } from "react";
import {
  calcLegalDelivary,
  rotateStrike,
  Bowl,
  Batter,
  Bowler,
  getRunData,
  caclTotalRun,
} from "../_lib/ulits";

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
  innings: 1,
  // allOvers: [[]],
  allOvers: [],
  currentOver: [],
  // currentBatters: [{}, {}],
  currentBatters: [new Batter("Subhamn Gill"), new Batter("Viart Kohli")],
  onStrike: 0,
  // currentBowler: new Bowler("Jasprit"),
  currentBowler: {},
  allBowlers: [new Bowler("sapnil"), new Bowler("Bolt")],
  allBatters: [],
  totalWicketFall: 0,
  totalOver: 1,
  over: 0,
  isNewOver: true,
  isFreeHit: false,
  isGameOn: false,
  targetToWin: "",
  isInningsEnd: false,
  matchEnd: false,
  winningTeam: "",
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

  let isMatchEnd = state.matchEnd;
  if (state.innings === 2 && !state.matchEnd) {
    isMatchEnd =
      updateOver >= state.totalOver ||
      caclTotalRun(updatedAllOvers) > state.targetToWin;
  }

  return {
    ...state,
    currentOver: updatedOver,
    allOvers: updatedAllOvers,
    isNewOver: isOverEnd,
    over: updateOver,
    isInningsEnd: updateOver >= state.totalOver,
    isFreeHit: isNextBallFreeHit,
    onStrike,
    currentBowler: isOverEnd ? {} : state.currentBowler,
    isGameOn: !isOverEnd,
    matchEnd: isMatchEnd,
  };
}

function updateAfterWicketFall(state, outBatter) {
  // delete the batter form the current batter
  const currentBatters = state.currentBatters.map((batter) =>
    batter.id === outBatter.id ? {} : batter
  );

  // allBatters
  // if batter on strike the rest this filed
  const onStrikeBatter = state.onStrike === outBatter ? "" : state.onStrike;

  let isMatchEnd = state.matchEnd;
  if (state.innings === 2 && !state.matchEnd)
    isMatchEnd = state.isInningsEnd || state.totalWicketFall + 1 === 10;

  return {
    currentBatters,
    onStrike: onStrikeBatter,
    totalWicketFall: state.totalWicketFall + 1,
    isInningsEnd: state.isInningsEnd || state.totalWicketFall + 1 === 10,
    isGameOn: false,
    matchEnd: isMatchEnd,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "extrasRun":
      return { ...state };

    case "scoreRun":
      const { bowler, batter, run: scoreRun } = action.payload;
      const bowl = new Bowl(bowler, batter).score(scoreRun);

      batter.scoreRun(getRunData(bowl));
      bowler.bowl(getRunData(bowl));

      const updatedData = updateAllOversData(state, bowl);

      return {
        ...updatedData,
      };

    case "bowlWideBall":
      const {
        bowler: bowlerW,
        batter: batterW,
        run: totalRunW,
        isOut,
        outType,
        outBatter: outBatterInWideBall,
      } = action.payload;

      let wideBall = new Bowl(bowlerW, batterW).wideBall(totalRunW);

      if (isOut && outType === "stumps") {
        wideBall = wideBall.wicketFall(totalRunW, outBatterInWideBall, outType);
        bowlerW.bowl(getRunData(wideBall));
      } else {
        bowlerW.bowl(getRunData(wideBall));
      }

      const updatedDataAfterWide = updateAllOversData(state, wideBall);
      const updateCurrentBattersW = isOut
        ? updateAfterWicketFall(
            { ...state, ...updatedDataAfterWide },
            outBatterInWideBall
          )
        : {};

      return { ...updatedDataAfterWide, ...updateCurrentBattersW };

    case "bowlNoBall":
      const {
        bowler: bowlerN,
        batter: batterN,
        run: totalRunN,
        isByesRun,
        isOut: isOutInNoBall,
        outType: outTypeN,
        outBatter: outBatterInNoball,
      } = action.payload;

      let noBall = new Bowl(bowlerN, batterN).noBall(totalRunN);

      if (!isByesRun)
        batterN.scoreRun(getRunData({ ...noBall, run: noBall.run - 1 }));

      if (isOutInNoBall && outTypeN === "run-out") {
        noBall = noBall.wicketFall();
      }

      bowlerN.bowl(getRunData(noBall));

      if (isOutInNoBall) {
        noBall = noBall.wicketFall(totalRunN, outBatterInNoball, outTypeN);
      }

      const updatedDataAfterNo = updateAllOversData(state, noBall);
      const updateCurrentBattersN = isOutInNoBall
        ? updateAfterWicketFall(
            { ...state, ...updatedDataAfterNo },
            outBatterInNoball
          )
        : {};

      return { ...updatedDataAfterNo, ...updateCurrentBattersN };

    case "wicketFall":
      const {
        wicketType,
        outBatter,
        batter: batterWk,
        bowler: bowlerWk,
        run,
        isByesRun: isByes,
      } = action.payload;

      const wicketBowl = new Bowl(bowlerWk, batterWk).wicketFall(
        run,
        outBatter,
        wicketType
      );

      bowlerWk.bowl(getRunData({ ...wicketBowl, run: 0 }));
      if (isByes) batterWk.scoreRun(getRunData({ ...wicketBowl, run: 0 }));
      if (!isByes) batterWk.scoreRun(getRunData({ ...wicketBowl, run }));

      const updatedDataWk = updateAllOversData(state, wicketBowl);

      const updateCurrentBatters = updateAfterWicketFall(
        { ...state, ...updatedDataWk },
        outBatter
      );

      return {
        ...updatedDataWk,
        ...updateCurrentBatters,
      };

    case "setBatters":
      const newCurrentBatters = action.payload;

      // UPDATE LISTED PLAYERS
      const updateBattersList = [...state.allBatters];
      const alreadyListedBatters = state.allBatters.map((batter) => batter.id);

      newCurrentBatters.forEach((batter) => {
        if (!alreadyListedBatters.includes(batter.id)) {
          updateBattersList.push(batter);
        }
      });
      return {
        ...state,
        currentBatters: newCurrentBatters,
        allBatters: updateBattersList,
      };

    case "playStart":
      return { ...state, isGameOn: true };

    case "setStriker":
      return { ...state, onStrike: action.payload };

    case "setCurrentBowler":
      const newBowler = action.payload;
      const updatedBowlerList = [...state.allBowlers];
      if (
        state.allBowlers.filter((bowler) => bowler.id === newBowler.id)
          .length === 0
      )
        updatedBowlerList.push(newBowler);
      return {
        ...state,
        currentBowler: action.payload,
        allBowlers: updatedBowlerList,
      };
    case "setTotalOver":
      return { ...state, totalOver: action.payload };

    case "1stInningsReset":
      const { totalOver, allOvers } = state;
      const targetToWin = caclTotalRun(allOvers);

      return { ...initialState, totalOver, targetToWin, innings: 2 };

    default:
      throw new Error("Action unknown");
  }
}

function InningsProvider({ children }) {
  const [allStates, dispatch] = useReducer(reducer, initialState);

  const currentOverActivity = allStates.currentOver.map((bowl) => {
    return { run: bowl.run, type: bowl.type };
  });

  const totalScore = caclTotalRun(allStates.allOvers);

  // NOTEME:
  // console.log("☄️☄️", allStates);

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
