import Image from "next/image";
import { useMatchContext } from "../_context/MatchContext";
import RunRate from "./RunRate";
import TeamShortScore from "./TeamShortScore";
import TeamWin from "./TeamWin";

function TeamScore({ isPrimary = true }) {
  const { teams, scoreboardRef } = useMatchContext();

  return (
    <div
      className="my-6 border border-transparent"
      ref={isPrimary ? scoreboardRef : null}
    >
      <div className="grid grid-cols-2 gap-x-16 bg-white">
        <div className="grid grid-cols-2 gap-x-2 py-4 font-semibold">
          <div className=" flex flex-col items-center justify-self-end">
            <div className="w-12 h-12 bg-red-500 relative">
              <Image
                src="/teams/team-logo-1.png"
                alt={`default logo of ${teams.team1}`}
                fill
                className="object-cover object-center"
              />
            </div>
            <p className="mt-2 text-center">{teams.team1}</p>
          </div>

          <TeamShortScore teamName={teams.team1} />
        </div>

        {/* CARD:2 */}
        <div className="grid grid-cols-2 gap-x-2 py-4 font-semibold">
          <TeamShortScore teamName={teams.team2} />
          <div className=" flex flex-col items-center justify-self-start">
            <div className="w-12 h-12 bg-yellow-400 relative">
              <Image
                src="/teams/team-logo-2.png"
                alt={`default logo of ${teams.team1}`}
                fill
                className="object-cover object-center"
              />
            </div>
            <p className="mt-2 text-center">{teams.team2}</p>
          </div>
        </div>
        <div className="col-span-2 w-2/5 mx-auto">
          <RunRate />
        </div>
      </div>
      <TeamWin />
    </div>
  );
}

export default TeamScore;
