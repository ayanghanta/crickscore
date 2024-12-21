import { useState } from "react";
import { useInnings } from "../_context/InningsContext";

const outTypesList = [
  "bold",
  "lbw",
  "catch",
  "stumps",
  "hit-wicket",
  "run-out",
];

function OutTypes({ outHandler }) {
  const [selectedOutType, setSelectedOutType] = useState("");
  const { currentBatters, onStrike } = useInnings();
  const onStrikeBatter = currentBatters[onStrike];
  const nonStrikerBatter = currentBatters[onStrike === 0 ? 1 : 0];

  function handleChange(type) {
    setSelectedOutType(type);
  }

  function handleOut() {
    const strikerOut = ["bold", "lbw", "catch", "stumps", "hit-wicket"];
    let outBatter;
    if (strikerOut.includes(selectedOutType)) outBatter = onStrikeBatter;
    else outBatter = nonStrikerBatter;

    outHandler(selectedOutType, outBatter, 0);
  }

  return (
    <div>
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
