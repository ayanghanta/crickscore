import { useState } from "react";
import { useInnings } from "../_context/InningsContext";
import Button from "./Button";
import OutTypes from "./OutTypes";
import ExtrasActions from "./ExtrasActions";

function OverActions() {
  const [fallWicket, setFallWicket] = useState(false);
  const { dispatch, isFreeHit, isGameOn, currentBatters, onStrike } =
    useInnings();

  // FIXME:
  const currnetBlowler = {
    name: "jasprit",
    id: "a1",
  };

  function scoreValidRun(run) {
    // dispatch({ type: "scoreRun", payload: run });
    dispatch({
      type: "scoreRun",
      payload: {
        bowler: currnetBlowler,
        batter: currentBatters[onStrike],
        run,
      },
    });
  }

  function handleWicketFall(wicketType, outBatter, run = 0) {
    setFallWicket(false);
    dispatch({ type: "wicketFall", payload: { wicketType, outBatter, run } });
  }

  function handleWideBall(run) {
    dispatch({ type: "bowlWideBall", payload: run });
  }

  function handleNoBall(run) {
    dispatch({ type: "bowlNoBall", payload: run });
  }

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
          <span className="px-1 border border-gray-400">+</span>
        </div>
        <div className="border border-white p-1 space-x-1">
          <Button onClick={() => handleNoBall(1)}>NO</Button>
          <span className="px-1 border border-gray-400">+</span>
        </div>
        <Button onClick={() => setFallWicket(true)}>WICKET</Button>
      </div>
      {fallWicket && <OutTypes outHandler={handleWicketFall} />}
      <ExtrasActions />
    </div>
  );
}

export default OverActions;
