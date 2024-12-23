import { useState } from "react";
import Button from "./Button";
import { useInnings } from "../_context/InningsContext";
import ByesCheck from "./ByesCheck";
import RunoutType from "./RunoutType";

function ExtrasActions({ bowlType, handleHide }) {
  const {
    dispatch,
    isFreeHit,
    isGameOn,
    currentBatters,
    onStrike,
    currentBowler,
  } = useInnings();
  const [runType, setRunType] = useState("byes");
  const [out, setOut] = useState(false);
  const [run, setRun] = useState(0);
  const [outType, setOutType] = useState(bowlType === "no" ? "run-out" : "");
  const [selectedOutBatter, setSelectedOutBatter] = useState("");

  function handleSubmit() {
    const outBatter = currentBatters
      .filter((batter) => batter.id === selectedOutBatter)
      .at(0);

    if (bowlType === "wide") {
      const payload = {
        bowler: currentBowler,
        batter: currentBatters[onStrike],
        run: run + 1,
        isOut: out,
      };

      if (out) {
        payload.outType = outType;
        payload.outBatter = outBatter;
      }

      dispatch({
        type: "bowlWideBall",
        payload,
      });
    }
    if (bowlType === "no") {
      const payload = {
        bowler: currentBowler,
        batter: currentBatters[onStrike],
        run: run + 1,
        isByesRun: runType === "byes",
        isOut: out,
      };

      if (out) {
        payload.outType = outType;
        payload.outBatter = outBatter;
      }

      dispatch({ type: "bowlNoBall", payload });
    }

    handleHide();
  }

  return (
    <div>
      <p>
        {bowlType === "wide" ? "WIDE" : "NO"}(1) + {run}
        {runType === "byes" && " run by byes"}
      </p>

      <ByesCheck
        handler={setRunType}
        condition={bowlType !== "wide"}
        runType={runType}
      />

      <RunOptions clickHandler={setRun} />
      <div>
        <input
          type="checkbox"
          id="out"
          checked={out}
          onChange={() => setOut((out) => !out)}
        />
        <label htmlFor="out">Out</label>
      </div>
      {out && (
        <RunoutType
          handler={setOutType}
          outType={outType}
          bowlType={bowlType}
        />
      )}

      {out && (
        <StumpAndRunOut
          currentBatters={currentBatters}
          setSelectOutBatter={setSelectedOutBatter}
        />
      )}

      <button className="bg-blue-400 px-1" onClick={handleSubmit}>
        OK
      </button>
    </div>
  );
}

function RunOptions({ clickHandler }) {
  return (
    <div className="flex gap-2">
      <Button onClick={() => clickHandler(0)}>0</Button>
      <Button onClick={() => clickHandler(1)}>1</Button>
      <Button onClick={() => clickHandler(2)}>2</Button>
      <Button onClick={() => clickHandler(3)}>3</Button>
      <Button onClick={() => clickHandler(4)}>4</Button>
      <Button onClick={() => clickHandler(6)}>6</Button>
    </div>
  );
}

function StumpAndRunOut({ currentBatters, setSelectOutBatter }) {
  return (
    <div>
      <div>
        <label htmlFor="selectOutBatter">Out Batter:</label>
        <select
          id="selectOutBatter"
          className="text-gray-700"
          onChange={(e) => setSelectOutBatter(e.target.value)}
        >
          <option value="">Select batter</option>
          {currentBatters.map((batter) => (
            <option value={batter.id} key={batter.id}>
              {batter.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ExtrasActions;
