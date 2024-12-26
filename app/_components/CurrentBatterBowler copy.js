import { useEffect, useState } from "react";
import { useInnings } from "../_context/InningsContext";
import { Batter, Bowler } from "../_lib/ulits";
import DisplayBowleroptions from "./DisplayBowleroptions";

function CurrentBatterBowler() {
  const {
    currentBatters,
    currentBowler,
    allBowlers,
    dispatch,
    onStrike,
    isGameOn,
    isNewOver,
    isInningsEnd,
  } = useInnings();
  const [batterName1, setBatterName1] = useState(currentBatters[0].name || "");
  const [batterName2, setBatterName2] = useState(currentBatters[1].name || "");
  const [bowlerName, setBowlerName] = useState(currentBowler.name || "");
  const [selectedBowler, setSelectedBowler] = useState("");

  useEffect(
    function () {
      setBatterName1(currentBatters[0].name || "");
      setBatterName2(currentBatters[1].name || "");
      setBowlerName(currentBowler.name || "");
    },
    [currentBatters, currentBowler]
  );

  function handleSelectExistingBowler(selectBowler) {
    if (!selectBowler?.name) return;

    setBowlerName(selectBowler.name);
    setSelectedBowler(selectBowler);
  }

  function handleBowlerName(name) {
    if (name.trim() === selectedBowler.name) return setBowlerName(name);
    setSelectedBowler("");
    setBowlerName(name);
  }

  function handleOnFiledBatterAndBowler() {
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

    // TO HANLDE CURRENT BOWLER

    if (!selectedBowler && !bowlerName) return;

    if (!currentBowler.name)
      dispatch({
        type: "setCurrentBowler",
        payload: selectedBowler ? selectedBowler : new Bowler(bowlerName),
      });

    dispatch({ type: "playStart" });

    setSelectedBowler("");
  }

  // console.log(selectBowler);

  function handleSetStriker(value) {
    dispatch({ type: "setStriker", payload: value });
  }

  return (
    <div className="grid grid-cols-2">
      <div>
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
      </div>

      <div>
        <p>Bowler: </p>
        <div className="w-48">
          <input
            type="text"
            disabled={!isNewOver || isGameOn}
            value={bowlerName}
            className="text-gray-700 w-full"
            onChange={(e) => handleBowlerName(e.target.value)}
          />
          {!isGameOn && bowlerName && isNewOver && (
            <DisplayBowleroptions
              handleSelect={handleSelectExistingBowler}
              bowlerList={allBowlers}
            />
          )}
        </div>
      </div>

      {isInningsEnd && <button></button>}

      {!isGameOn && !isInningsEnd && (
        <button
          className="bg-amber-200 text-gray-700"
          onClick={handleOnFiledBatterAndBowler}
        >
          Start Play
        </button>
      )}
    </div>
  );
}

export default CurrentBatterBowler;
