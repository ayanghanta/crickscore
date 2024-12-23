import { useState } from "react";
import { useInnings } from "../_context/InningsContext";
import Button from "./Button";
import ByesCheck from "./ByesCheck";

const outTypesList = [
  "bold",
  "lbw",
  "catch",
  "stumps",
  "hit-wicket",
  "run-out",
];

function OutTypes({ outHandler }) {
  const [selectOutBatter, setSelectOutBatter] = useState(""); // store selected out batter id
  const [selectedOutType, setSelectedOutType] = useState("");
  const [runBeforeOut, setRunBeforeOut] = useState(0);
  const { currentBatters, onStrike } = useInnings();
  const [runType, setRunType] = useState("run");
  const onStrikeBatter = currentBatters[onStrike];
  const nonStrikerBatter = currentBatters[onStrike === 0 ? 1 : 0];

  function handleChange(type) {
    setSelectedOutType(type);
  }

  function handleOut() {
    const strikerOut = ["bold", "lbw", "catch", "stumps", "hit-wicket"];
    let outBatter;
    if (strikerOut.includes(selectedOutType)) outBatter = onStrikeBatter;
    else {
      if (!selectOutBatter) return;
      outBatter = currentBatters
        .filter((batter) => batter.id === selectOutBatter)
        .at(0);
    }

    outHandler(selectedOutType, outBatter, runBeforeOut, runType !== "run");
  }

  return (
    <div>
      <p>
        {runBeforeOut} {runType === "byes" && "byes"} run + run out.
      </p>
      <div>
        {outTypesList.map((item) => (
          <div key={item}>
            <label htmlFor={item} className="capitalize">
              {item.split("-").join(" ")}
            </label>
            <input
              type="checkbox"
              id={item}
              checked={selectedOutType === item}
              onChange={() => handleChange(item)}
            />
          </div>
        ))}
      </div>
      {selectedOutType === "run-out" && (
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
          <p>Run before run out</p>
          <ByesCheck handler={setRunType} runType={runType} />
          <div className="flex gap-1">
            <Button onClick={() => setRunBeforeOut(0)}>0</Button>
            <Button onClick={() => setRunBeforeOut(1)}>1</Button>
            <Button onClick={() => setRunBeforeOut(2)}>2</Button>
            <Button onClick={() => setRunBeforeOut(3)}>3</Button>
          </div>
        </div>
      )}
      {!!selectedOutType && (
        <button
          className="bg-red-600 text-gray-50 py-1 px-2"
          onClick={handleOut}
        >
          OUT
        </button>
      )}
    </div>
  );
}

export default OutTypes;
