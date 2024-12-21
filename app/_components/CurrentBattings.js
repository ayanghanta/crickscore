import { useEffect, useState } from "react";
import { useInnings } from "../_context/InningsContext";
import { Batter } from "../_lib/ulits";

function CurrentBattings() {
  const { currentBatters, dispatch, onStrike, isGameOn } = useInnings();
  const [batterName1, setBatterName1] = useState(currentBatters[0].name || "");
  const [batterName2, setBatterName2] = useState(currentBatters[1].name || "");

  useEffect(
    function () {
      setBatterName1(currentBatters[0].name || "");
      setBatterName2(currentBatters[1].name || "");
    },
    [currentBatters]
  );

  // console.log({ batter1, batter2 });
  function handleOnFiledBatters() {
    if (!batterName1 || !batterName2) return;

    const batter1 = !currentBatters[0].name
      ? new Batter(batterName1)
      : currentBatters[0];
    const batter2 = !currentBatters[1].name
      ? new Batter(batterName2)
      : currentBatters[1];

    dispatch({
      type: "setBatters",
      payload: [batter1, batter2],
    });
  }

  function handleSetStriker(value) {
    dispatch({ type: "setStriker", payload: value });
  }

  return (
    <div className="space-y-2">
      <div>
        <input
          type="checkbox"
          checked={onStrike === 0}
          onChange={() => handleSetStriker(0)}
        />
        <input
          type="text"
          value={batterName1}
          onChange={(e) => setBatterName1(e.target.value)}
          className="text-gray-700"
          disabled={isGameOn && (isGameOn || !batterName1)}
        />
      </div>
      <div>
        <input
          type="checkbox"
          checked={onStrike === 1}
          onChange={() => handleSetStriker(1)}
        />
        <input
          type="text"
          value={batterName2}
          onChange={(e) => setBatterName2(e.target.value)}
          disabled={isGameOn && (isGameOn || !batterName2)}
          className="text-gray-700"
        />
      </div>

      {batterName1 && batterName2 && !isGameOn && (
        <button
          className="bg-amber-200 text-gray-700"
          onClick={handleOnFiledBatters}
        >
          Start Play
        </button>
      )}
    </div>
  );
}

export default CurrentBattings;
