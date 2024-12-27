import { useEffect, useState } from "react";
import { useInnings } from "../_context/InningsContext";
import { Batter, Bowler } from "../_lib/ulits";
import DisplayBowleroptions from "./DisplayBowleroptions";
import { useStart2ndInnings } from "./_hooks/useStart2ndinnings";
import { useScoreBoard } from "../_context/ScoreBoardContext";

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
  const { start2ndinnings } = useStart2ndInnings();
  const { currentInnings } = useScoreBoard();

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
    <div className="grid grid-cols-2 gap-8 items-start mb-12 md:w-6/12 mx-auto">
      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-700 mb-2">Batters</p>
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={onStrike === 0}
            onChange={() => handleSetStriker(0)}
            className="h-5 w-5 text-indigo-600 bg-gray-200 border-2 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 ease-in-out cursor-pointer"
          />
          <input
            type="text"
            value={batterName1}
            onChange={(e) => setBatterName1(e.target.value)}
            className={`w-full p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed`}
            disabled={isGameOn && (isGameOn || !batterName1)}
            placeholder="Enter Batter 1"
          />
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={onStrike === 1}
            onChange={() => handleSetStriker(1)}
            className="h-5 w-5 text-indigo-600 bg-gray-200 border-2 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 ease-in-out cursor-pointer"
          />
          <input
            type="text"
            value={batterName2}
            onChange={(e) => setBatterName2(e.target.value)}
            className={`w-full p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed`}
            disabled={isGameOn && (isGameOn || !batterName2)}
            placeholder="Enter Batter 2"
          />
        </div>
      </div>

      <div>
        <p className="text-lg font-medium text-gray-700 mb-2">Bowler</p>
        <div className="relative">
          <input
            type="text"
            disabled={!isNewOver || isGameOn}
            value={bowlerName}
            onChange={(e) => handleBowlerName(e.target.value)}
            className={`w-full p-2 border ${
              !isNewOver || isGameOn
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "border-gray-300 text-gray-700"
            } rounded focus:outline-none focus:ring-2 focus:ring-indigo-600`}
            placeholder="Enter Bowler Name"
          />
          {!isGameOn && bowlerName && isNewOver && (
            <div className="absolute top-12 left-0 bg-white border border-gray-200 shadow-lg rounded w-full z-10">
              <DisplayBowleroptions
                handleSelect={handleSelectExistingBowler}
                bowlerList={allBowlers}
              />
            </div>
          )}
        </div>
      </div>
      {isInningsEnd && currentInnings === 1 && (
        <button
          className="bg-green-600 text-white font-bold py-2 px-4 rounded-sm hover:bg-green-700 transition-all duration-300 col-span-2 shadow-md"
          onClick={start2ndinnings}
        >
          Start 2nd Innings
        </button>
      )}

      {!isGameOn && !isInningsEnd && (
        <button
          className="bg-indigo-500 text-white py-2 font-bold rounded-sm hover:bg-indigo-600 transition duration-300"
          onClick={handleOnFiledBatterAndBowler}
        >
          Start Play
        </button>
      )}
    </div>
  );
}

export default CurrentBatterBowler;
