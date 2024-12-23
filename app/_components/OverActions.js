import { useState } from "react";
import { useInnings } from "../_context/InningsContext";
import Button from "./Button";
import OutTypes from "./OutTypes";
import ExtrasActions from "./ExtrasActions";

function OverActions() {
  const [fallWicket, setFallWicket] = useState(false);
  const {
    dispatch,
    isFreeHit,
    isGameOn,
    currentBatters,
    onStrike,
    currentBowler,
  } = useInnings();

  const [extraAction, setExtraAction] = useState("");

  function scoreValidRun(run) {
    // dispatch({ type: "scoreRun", payload: run });
    dispatch({
      type: "scoreRun",
      payload: {
        bowler: currentBowler,
        batter: currentBatters[onStrike],
        run,
      },
    });
  }

  function handleWicketFall(wicketType, outBatter, run = 0, isByesRun) {
    setFallWicket(false);
    dispatch({
      type: "wicketFall",
      payload: {
        wicketType,
        batter: currentBatters[onStrike],
        bowler: currentBowler,
        outBatter,
        run,
        isByesRun,
      },
    });
  }

  function handleWideBall(run) {
    dispatch({
      type: "bowlWideBall",
      payload: {
        bowler: currentBowler,
        batter: currentBatters[onStrike],
        run: 1,
      },
    });
  }

  function handleNoBall(run) {
    dispatch({
      type: "bowlNoBall",
      payload: {
        bowler: currentBowler,
        batter: currentBatters[onStrike],
        run: 1,
      },
    });
  }

  // function handleExtraAction(bawlType) {}

  if (!isGameOn) return null;

  return (
    <div>
      {isFreeHit && <p>FREE HIT 💥</p>}

      <div className="flex gap-2">
        <Button onClick={() => scoreValidRun(0)}>0</Button>
        <Button onClick={() => scoreValidRun(1)}>1</Button>
        <Button onClick={() => scoreValidRun(2)}>2</Button>
        <Button onClick={() => scoreValidRun(3)}>3</Button>
        <Button onClick={() => scoreValidRun(4)}>4</Button>
        <Button onClick={() => scoreValidRun(6)}>6</Button>
        <div className="border border-white p-1 space-x-1">
          <Button onClick={() => handleWideBall(1)}>Wide</Button>
          <span
            className="px-1 border border-gray-400 cursor-pointer"
            onClick={() => setExtraAction("wide")}
          >
            +
          </span>
        </div>
        <div className="border border-white p-1 space-x-1">
          <Button onClick={() => handleNoBall(1)}>NO</Button>
          <span
            className="px-1 border border-gray-400 cursor-pointer"
            onClick={() => setExtraAction("no")}
          >
            +
          </span>
        </div>
        <Button onClick={() => setFallWicket(true)}>WICKET</Button>
      </div>
      {fallWicket && <OutTypes outHandler={handleWicketFall} />}
      {extraAction && (
        <ExtrasActions
          bowlType={extraAction}
          handleHide={() => setExtraAction("")}
        />
      )}
    </div>
  );
}

export default OverActions;
