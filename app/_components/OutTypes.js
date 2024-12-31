import { useEffect, useState } from "react";
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
const strikerOut = ["bold", "lbw", "catch", "stumps", "hit-wicket"];

function OutTypes({ outHandler, handelCloseModal }) {
  const [selectOutBatter, setSelectOutBatter] = useState(""); // store selected out batter id
  const [selectedOutType, setSelectedOutType] = useState("");
  const [runBeforeOut, setRunBeforeOut] = useState(0);
  const { currentBatters, onStrike, isFreeHit } = useInnings();
  const [runType, setRunType] = useState("run");
  const onStrikeBatter = currentBatters[onStrike];
  const nonStrikerBatter = currentBatters[onStrike === 0 ? 1 : 0];

  function handleChange(type) {
    setSelectedOutType(type);
  }

  useEffect(
    function () {
      if (strikerOut.includes(selectedOutType)) setRunBeforeOut(0);
    },
    [selectedOutType]
  );

  function handleOut() {
    let outBatter;
    if (strikerOut.includes(selectedOutType)) {
      outBatter = onStrikeBatter;
      setRunBeforeOut(0);
    } else {
      if (!selectOutBatter) return;
      outBatter = currentBatters
        .filter((batter) => batter.id === selectOutBatter)
        .at(0);
    }

    outHandler(selectedOutType, outBatter, runBeforeOut, runType !== "run");
    handelCloseModal();
  }

  let finalOutTypeList = outTypesList;
  if (isFreeHit) finalOutTypeList = ["run-out"];

  return (
    <div>
      <p className="text-lg font-semibold text-indigo-400 mb-6 text-center md:text-left">
        {runBeforeOut > 0 &&
          `${runBeforeOut} ${runType === "byes" ? "byes" : ""} run +`}
        {selectedOutType && `${selectedOutType} Out`}
      </p>
      <p className="font-semibold text-gray-700 text-lg mb-4">Out Type</p>
      <div className="mb-6 grid grid-cols-3 gap-x-2 gap-y-2">
        {finalOutTypeList.map((item) => (
          <div key={item} className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={item}
              checked={selectedOutType === item}
              onChange={() => handleChange(item)}
              className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor={item}
              className="capitalize text-gray-700 font-medium cursor-pointer select-none"
            >
              {item.split("-").join(" ")}
            </label>
          </div>
        ))}
      </div>
      {selectedOutType === "run-out" && (
        <div>
          <div className="flex flex-col space-y-2 mb-6">
            <label
              htmlFor="selectOutBatter"
              className="text-gray-700 font-medium"
            >
              Out Batter:
            </label>
            <select
              id="selectOutBatter"
              className="text-gray-700 bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

          <p className="font-semibold text-gray-700 mb-2">Run before run out</p>
          <ByesCheck handler={setRunType} runType={runType} />
          <div className="flex gap-1">
            <Button type="modalRun" onClick={() => setRunBeforeOut(0)}>
              0
            </Button>
            <Button type="modalRun" onClick={() => setRunBeforeOut(1)}>
              1
            </Button>
            <Button type="modalRun" onClick={() => setRunBeforeOut(2)}>
              2
            </Button>
            <Button type="modalRun" onClick={() => setRunBeforeOut(3)}>
              3
            </Button>
          </div>
        </div>
      )}
      <div className="text-center">
        {!!selectedOutType && (
          <button
            className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition duration-200 mt-10"
            onClick={handleOut}
          >
            ☝️ OUT
          </button>
        )}
      </div>
    </div>
  );
}

export default OutTypes;
