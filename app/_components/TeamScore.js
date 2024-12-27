import { useInnings } from "../_context/InningsContext";
import { useMatchContext } from "../_context/MatchContext";
import RunRate from "./RunRate";
import TeamShortScore from "./TeamShortScore";

function TeamScore() {
  const { teams } = useMatchContext();

  return (
    <div className="my-6 grid grid-cols-2 gap-x-16 ">
      <div className="grid grid-cols-2 gap-x-2 py-4 font-semibold">
        <div className=" flex flex-col items-center justify-self-end">
          <div className="w-12 h-12 bg-red-500 "></div>
          <p className="mt-2 text-center">{teams.team1}</p>
        </div>
        <TeamShortScore teamName={teams.team1} />
      </div>

      {/* CARD:2 */}
      <div className="grid grid-cols-2 gap-x-2 py-4 font-semibold">
        <TeamShortScore teamName={teams.team2} />
        <div className=" flex flex-col items-center justify-self-start">
          <div className="w-12 h-12 bg-yellow-400 "></div>
          <p className="mt-2 text-center">{teams.team2}</p>
        </div>
      </div>
      <div className="col-span-2 w-2/5 mx-auto">
        <RunRate />
      </div>
    </div>
  );
}

export default TeamScore;
