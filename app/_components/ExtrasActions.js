import { useState } from "react";
import Button from "./Button";
import { useInnings } from "../_context/InningsContext";
import ByesCheck from "./ByesCheck";
import RunoutType from "./RunoutType";

function ExtrasActions({ bowlType, handelCloseModal }) {
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

    handelCloseModal();
  }

  return (
    <div>
      <p className="text-lg font-semibold text-indigo-400 mb-6 text-center md:text-left">
        {bowlType === "wide" ? "Wide Ball " : "No Ball"}(1) + {run}
        {runType === "byes" && " run by byes"}
      </p>

      <ByesCheck
        handler={setRunType}
        condition={bowlType !== "wide"}
        runType={runType}
      />

      <RunOptions clickHandler={setRun} />
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          id="out"
          checked={out}
          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          onChange={() => setOut((out) => !out)}
        />
        <label
          htmlFor="out"
          className="text-gray-700 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
        >
          Out
        </label>
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

      <div className="text-center">
        <Button type="modalPrimary" onClick={handleSubmit}>
          Save action
        </Button>
      </div>
    </div>
  );
}

function RunOptions({ clickHandler }) {
  return (
    <div className="flex gap-2 mb-6">
      <Button type="modalRun" onClick={() => clickHandler(0)}>
        0
      </Button>
      <Button type="modalRun" onClick={() => clickHandler(1)}>
        1
      </Button>
      <Button type="modalRun" onClick={() => clickHandler(2)}>
        2
      </Button>
      <Button type="modalRun" onClick={() => clickHandler(3)}>
        3
      </Button>
      <Button type="modalRun" onClick={() => clickHandler(4)}>
        4
      </Button>
      <Button type="modalRun" onClick={() => clickHandler(6)}>
        6
      </Button>
    </div>
  );
}

function StumpAndRunOut({ currentBatters, setSelectOutBatter }) {
  return (
    <div className="space-y-4 mb-12">
      <div className="flex flex-col space-y-2">
        <label htmlFor="selectOutBatter" className="text-gray-700 font-medium">
          Out Batter:
        </label>
        <select
          id="selectOutBatter"
          className="text-gray-700 bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
