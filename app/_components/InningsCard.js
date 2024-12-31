import { useState } from "react";
import { useInnings } from "../_context/InningsContext";
import { useMatchContext } from "../_context/MatchContext";
import { useScoreBoard } from "../_context/ScoreBoardContext";
import DownloadInningsCard from "./toolbar/DownloadInningsCard";

function InningsCard() {
  const { teams, battingFirstTeam, inningsCardRef } = useMatchContext();
  const { currentInnings, currentlyBattingTeam, firstInningsData } =
    useScoreBoard();
  const { allBatters, allBowlers } = useInnings();
  const teamList =
    teams.team1 === battingFirstTeam
      ? [teams.team1, teams.team2]
      : [teams.team2, teams.team1];
  const [currentShowTeam, setCurrentShowTeam] = useState(teamList.at(0));

  let allBattersData = [];
  let allBowlersData = [];
  let isBatYet;

  if (currentShowTeam === currentlyBattingTeam) {
    allBattersData = allBatters;
    allBowlersData = allBowlers;
  } else {
    if (currentInnings === 1) isBatYet = false;
    if (currentInnings === 2) {
      allBattersData = firstInningsData.allBatters;
      allBowlersData = firstInningsData.allBowlers;
    }
  }

  return (
    <div className="border border-gray-300 rounded-sm px-4 py-4 mt-8 bg-gray-50 shadow-sm mb-24 ">
      <div className="flex items-center justify-between mb-4 px-4 bg-gray-50">
        <h3 className="text-xl font-bold text-gray-700">Innings Card</h3>
        <DownloadInningsCard />
      </div>

      <div ref={inningsCardRef} className="py-2 px-3">
        <div className="grid grid-cols-2 gap-0.5 mb-4">
          {teamList.map((teamName) => (
            <p
              className={`${
                teamName === currentShowTeam
                  ? "bg-indigo-500 text-gray-50 hover:bg-indigo-600"
                  : "bg-gray-300 text-gray-50 hover:bg-gray-400"
              }  font-bold py-2 px-2 text-center cursor-pointer transition duration-300`}
              key={teamName}
              onClick={() => setCurrentShowTeam(teamName)}
            >
              {teamName}
            </p>
          ))}
        </div>
        {isBatYet === false && (
          <p className="text-lg text-orange-400 font-semibold mb-4 text-center">
            Team {currentShowTeam} did not Bat yet.
          </p>
        )}
        {/* Batting Section */}
        <h2 className="text-xs font-semibold text-gray-600 mb-2">Batting</h2>
        <div className="grid grid-cols-[70fr_30fr] border-b pb-2 border-gray-300">
          <p className="text-gray-600 font-medium">Batter</p>
          <div className="grid grid-cols-5 text-center text-gray-600 font-medium">
            <p>R</p>
            <p>B</p>
            <p>4s</p>
            <p>6s</p>
            <p>S/R</p>
          </div>
        </div>

        {allBattersData.map((batter) => (
          <div
            className="grid grid-cols-[70fr_30fr] border-b pb-2 border-gray-200"
            key={batter.id}
          >
            <BatterStat batter={batter} />
          </div>
        ))}

        {/* Bowling Section */}
        <h2 className="mt-12 text-xs font-semibold text-gray-600 mb-2">
          Bowling
        </h2>
        <div className="grid grid-cols-[70fr_30fr] border-b pb-2 border-gray-300">
          <p className="text-gray-600 font-medium">Bowler</p>
          <div className="grid grid-cols-5 text-center text-gray-600 font-medium">
            <p>O</p>
            <p>M</p>
            <p>R</p>
            <p>W</p>
            <p>Econ</p>
          </div>
        </div>

        {allBowlersData.map((bowler) => (
          <div
            className="grid grid-cols-[70fr_30fr] border-b pb-2 border-gray-200"
            key={bowler.id}
          >
            <BowlerStat bowler={bowler} />
          </div>
        ))}
      </div>
    </div>
  );
}

//
function BatterStat({ batter }) {
  return (
    <>
      <p className="capitalize text-gray-700">{batter.name}</p>
      <div className="grid grid-cols-5 text-center text-gray-700">
        <p>{batter.getRun()}</p>
        <p>{batter.getTotalPlayedBall()}</p>
        <p>{batter.get4sCount()}</p>
        <p>{batter.get6sCount()}</p>
        <p>{batter.getStrikeRate()}</p>
      </div>
    </>
  );
}

function BowlerStat({ bowler }) {
  return (
    <>
      <p className="capitalize text-gray-700">{bowler.name}</p>
      <div className="grid grid-cols-5 text-center text-gray-700">
        <p>{bowler.calcOver()}</p>
        <p>-</p>
        <p>{bowler.calcRunConceded()}</p>
        <p>{bowler.calcTotalTake()}</p>
        <p>{bowler.calcEnon()}</p>
      </div>
    </>
  );
}

export default InningsCard;
